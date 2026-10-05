import { useRef, useEffect } from 'react';

/**
 * Animated wireframe city fly-through on canvas.
 * - Perspective grid floor with scrolling horizontal lines
 * - 120 randomly placed buildings approaching camera
 * - HUD crosshair overlay
 * - Occasional noise flicker
 */
export function ReelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rW = 0;
    let rH = 0;
    let running = true;

    // Generate building data
    const pts: { x: number; y: number; z: number; h: number }[] = [];
    for (let i = 0; i < 120; i++) {
      pts.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 400 + 100,
        z: Math.random() * 2000,
        h: 60 + Math.random() * 220,
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      rW = canvas!.width = rect.width;
      rH = canvas!.height = rect.height;
    }

    function draw(t: number) {
      ctx!.fillStyle = '#020406';
      ctx!.fillRect(0, 0, rW, rH);

      const time = t * 0.0003;
      const horizon = rH * 0.55;
      const cx = rW * 0.5;

      // Grid floor — vertical perspective lines
      ctx!.strokeStyle = 'rgba(79, 195, 255, 0.25)';
      ctx!.lineWidth = 1;
      for (let i = -20; i < 20; i++) {
        const xa = cx + i * 90;
        ctx!.beginPath();
        ctx!.moveTo(xa, horizon);
        ctx!.lineTo(cx + i * 40, rH);
        ctx!.stroke();
      }

      // Grid floor — horizontal scrolling lines
      for (let i = 0; i < 20; i++) {
        const prog = (i / 20 + (time * 2 % 1)) % 1;
        const y = horizon + prog * prog * (rH - horizon);
        ctx!.globalAlpha = 1 - prog;
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(rW, y);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      // Buildings — approaching camera
      for (const p of pts) {
        p.z -= 8;
        if (p.z < 10) p.z += 2000;

        const scale = 500 / p.z;
        const sx = cx + (p.x + Math.sin(time) * 40) * scale;
        const sy = horizon - 100 * scale;
        const w = 60 * scale;
        const h = p.h * scale;

        if (sx < -100 || sx > rW + 100) continue;

        ctx!.strokeStyle = `rgba(79, 195, 255, ${Math.min(0.9, scale * 2)})`;
        ctx!.strokeRect(sx - w / 2, sy - h, w, h);

        // Windows
        if (scale > 0.15) {
          ctx!.fillStyle = `rgba(79, 195, 255, ${scale * 0.3})`;
          for (let wy = sy - h + 6; wy < sy - 4; wy += 10) {
            for (let wx = sx - w / 2 + 4; wx < sx + w / 2 - 4; wx += 8) {
              if (((wx + wy + p.z) | 0) % 7 < 3) {
                ctx!.fillRect(wx, wy, 3, 4);
              }
            }
          }
        }
      }

      // HUD crosshair
      ctx!.strokeStyle = 'rgba(79, 195, 255, 0.4)';
      ctx!.beginPath();
      ctx!.moveTo(cx, rH * 0.3);
      ctx!.lineTo(cx, rH * 0.7);
      ctx!.moveTo(rW * 0.35, rH * 0.5);
      ctx!.lineTo(rW * 0.65, rH * 0.5);
      ctx!.stroke();
      ctx!.strokeRect(cx - 40, rH * 0.5 - 24, 80, 48);

      // Occasional noise flicker
      if ((t / 100 | 0) % 7 === 0) {
        ctx!.fillStyle = 'rgba(79, 195, 255, 0.04)';
        for (let i = 0; i < 20; i++) {
          const bx = Math.random() * rW;
          const by = Math.random() * rH;
          ctx!.fillRect(bx, by, Math.random() * 200, 1);
        }
      }
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
