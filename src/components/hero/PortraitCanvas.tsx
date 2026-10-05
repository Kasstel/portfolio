import { useRef, useEffect } from 'react';

interface PortraitCanvasProps {
  /**
   * Path to your portrait photo.
   * Best results: high contrast, face centered, dark background.
   * Recommended: 400-600px wide, any aspect ratio.
   */
  src?: string;
  className?: string;
}

/**
 * ASCII portrait from a real photo.
 *
 * How it works:
 *  1. Loads image into offscreen canvas
 *  2. On each frame, samples brightness at each cell position
 *  3. Maps brightness → ASCII character from density ramp
 *  4. Adds breathing sine modulation, scanline darkening, random glitch
 *  5. Draws target-lock arcs + crosshair overlay
 *
 * If no `src` or image fails to load → falls back to procedural silhouette.
 */
export function PortraitCanvas({ src }: PortraitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pW = 0;
    let pH = 0;
    let running = true;

    // ASCII density ramp (dark → bright)
    const ramp = ' .`-:;~+*=xX%#@';
    const cellW = 8 * dpr;
    const cellH = 12 * dpr;

    // Offscreen canvas for image sampling
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true })!;
    let imageData: ImageData | null = null;
    let imgW = 0;
    let imgH = 0;
    let imageLoaded = false;

    // Load photo
    if (src) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw image to offscreen canvas at a reasonable resolution
        // We only need ~1px per ASCII cell, so keep it small
        const maxCols = Math.ceil(800 / (cellW / dpr));
        const scale = Math.min(1, maxCols / img.width);
        imgW = offCanvas.width = Math.floor(img.width * scale);
        imgH = offCanvas.height = Math.floor(img.height * scale);
        offCtx.drawImage(img, 0, 0, imgW, imgH);
        imageData = offCtx.getImageData(0, 0, imgW, imgH);
        imageLoaded = true;
      };
      img.onerror = () => {
        console.warn('PortraitCanvas: failed to load image, using fallback silhouette');
      };
      img.src = src;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      pW = canvas!.width = rect.width * dpr;
      pH = canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + 'px';
      canvas!.style.height = rect.height - 30   +'px';
    }

    /**
     * Sample brightness from photo at normalized position (0..1, 0..1).
     * Returns 0..1 brightness value.
     */
    function samplePhoto(nx: number, ny: number): number {
      if (!imageData) return 0;

      const px = Math.floor(nx * (imgW - 1));
      const py = Math.floor(ny * (imgH - 1));
      const i = (py * imgW + px) * 4;

      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];

      if (a < 10) return 0;

      // Perceived brightness (luminance)
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }

    /**
     * Fallback: procedural silhouette (head + shoulders)
     */
    function silhouetteFallback(x: number, y: number, cx: number, cy: number, t: number): number {
      const dx = (x - cx) / (pW * 0.18);
      const dy = (y - cy - pH * 0.02) / (pH * 0.22);
      const head = 1 - (dx * dx + dy * dy * 1.1);

      const sy = (y - (cy + pH * 0.32)) / (pH * 0.22);
      const sx = (x - cx) / (pW * 0.35);
      const shoulders = 1 - (sx * sx * 0.9 + sy * sy * 3.2);

      let v = Math.max(head, shoulders);
      v += Math.sin(t * 0.8 + y * 0.01) * 0.04;

      const lx = (x - cx - pW * 0.08) / (pW * 0.3);
      const ly = (y - cy) / (pH * 0.3);
      v *= 1 - 0.25 * Math.hypot(lx, ly);

      if (((y / dpr) | 0) % 3 === 0) v *= 0.85;
      return v;
    }

    function draw(t: number) {
      ctx!.fillStyle = '#020406';
      ctx!.fillRect(0, 0, pW, pH);

      ctx!.font = `${11 * dpr}px JetBrains Mono, monospace`;
      ctx!.textBaseline = 'top';

      const cx = pW * 0.5;
      const cy = pH * 0.35;
      const time = t * 0.001;

      // Calculate grid bounds
      const cols = Math.floor(pW / cellW);
      const rows = Math.floor(pH / cellH);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellW;
          const y = row * cellH;

          let v: number;

          if (imageLoaded) {
            // Sample photo brightness at this cell position
            const nx = col / cols;
            const ny = row / rows;
            v = samplePhoto(nx, ny);

            // Apply effects
            // Breathing modulation
            v += Math.sin(time * 0.8 + y * 0.003) * 0.03;
            // Scanline darkening every 3rd row
            if (row % 3 === 0) v *= 0.85;
            // Slight contrast boost
            v = Math.pow(v, 0.85);
          } else {
            v = silhouetteFallback(x, y, cx, cy, time);
          }

          if (v > 0.02) {
            const idx = Math.min(ramp.length - 1, Math.max(0, Math.floor(v * ramp.length)));
            const ch = ramp[idx];
            const alpha = Math.min(1, 0.15 + v * 0.85);

            // Occasional glitch pixel (red)
            const glitch = Math.random() < 0.0008;
            ctx!.fillStyle = glitch
              ? `rgba(255, 56, 96, ${alpha})`
              : `rgba(79, 195, 255, ${alpha})`;
            ctx!.fillText(ch, x, y);
          }
        }
      }

      // ─── HUD OVERLAYS ───

      // Target-lock arcs (centered on face area)
      const lockCx = cx;
      const lockCy = imageLoaded ? pH * 0.3 : cy;
      const r = 60 * dpr + Math.sin(time * 1.4) * 4 * dpr;

      ctx!.strokeStyle = 'rgba(79, 195, 255, 0.55)';
      ctx!.lineWidth = 1 * dpr;

      ctx!.beginPath();
      ctx!.arc(lockCx, lockCy, r, -0.2, 1.0);
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.arc(lockCx, lockCy, r, Math.PI - 0.2, Math.PI + 1.0);
      ctx!.stroke();

      // Crosshair lines
      ctx!.strokeStyle = 'rgba(79, 195, 255, 0.25)';
      ctx!.beginPath();
      ctx!.moveTo(lockCx, 0);
      ctx!.lineTo(lockCx, pH);
      ctx!.moveTo(0, lockCy);
      ctx!.lineTo(pW, lockCy);
      ctx!.stroke();

      // Corner brackets around face zone
      const bx = lockCx - 80 * dpr;
      const by = lockCy - 80 * dpr;
      const bw = 160 * dpr;
      const bh = 160 * dpr;
      ctx!.strokeStyle = 'rgba(79, 195, 255, 0.3)';
      ctx!.lineWidth = 1 * dpr;
      const cornerLen = 20 * dpr;

      // Top-left
      ctx!.beginPath();
      ctx!.moveTo(bx, by + cornerLen); ctx!.lineTo(bx, by); ctx!.lineTo(bx + cornerLen, by);
      ctx!.stroke();
      // Top-right
      ctx!.beginPath();
      ctx!.moveTo(bx + bw - cornerLen, by); ctx!.lineTo(bx + bw, by); ctx!.lineTo(bx + bw, by + cornerLen);
      ctx!.stroke();
      // Bottom-left
      ctx!.beginPath();
      ctx!.moveTo(bx, by + bh - cornerLen); ctx!.lineTo(bx, by + bh); ctx!.lineTo(bx + cornerLen, by + bh);
      ctx!.stroke();
      // Bottom-right
      ctx!.beginPath();
      ctx!.moveTo(bx + bw - cornerLen, by + bh); ctx!.lineTo(bx + bw, by + bh); ctx!.lineTo(bx + bw, by + bh - cornerLen);
      ctx!.stroke();

      // Scan percentage text
      const scanPct = 80 + Math.sin(time * 0.5) * 5;
      ctx!.fillStyle = 'rgba(79, 195, 255, 0.6)';
      ctx!.font = `${9 * dpr}px JetBrains Mono, monospace`;
      ctx!.fillText(`SCAN: ${scanPct.toFixed(1)}%`, bx, by - 6 * dpr);
      ctx!.fillText(`MATCH: HIGH`, bx + bw - 80 * dpr, by - 6 * dpr);
    }

    function loop(t: number) {
      draw(t);
      if (running) requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(loop);

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', minHeight: 480 }}
    />
  );
}
