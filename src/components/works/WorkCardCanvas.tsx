import { useRef, useEffect } from 'react';

interface WorkCardCanvasProps {
  index: number;
}

/**
 * Generates a unique procedural pattern per card index.
 * 5 styles cycling: topographic lines, isometric cubes, concentric arcs, waveform, blueprint grid.
 */
export function WorkCardCanvas({ index }: WorkCardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    const rect = c.getBoundingClientRect();
    const W = c.width = rect.width;
    const H = c.height = rect.height;

    ctx.fillStyle = '#020406';
    ctx.fillRect(0, 0, W, H);

    // Seeded pseudo-random
    const seed = index * 11 + 3;
    function rnd(n: number): number {
      return ((Math.sin(seed + n * 12.9898) * 43758.5453) % 1 + 1) % 1;
    }

    const style = index % 5;
    ctx.strokeStyle = 'rgba(79, 195, 255, 0.4)';
    ctx.fillStyle = 'rgba(79, 195, 255, 0.25)';

    if (style === 0) {
      // Topographic lines
      for (let y = 10; y < H; y += 14) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const yy = y + Math.sin(x * 0.02 + y * 0.05 + seed) * 12 + rnd(x + y) * 4;
          if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
        }
        ctx.stroke();
      }
    } else if (style === 1) {
      // Isometric cubes
      for (let y = 20; y < H; y += 30) {
        for (let x = 20; x < W; x += 30) {
          if (rnd(x * y) < 0.7) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 10, y - 6);
            ctx.lineTo(x + 20, y);
            ctx.lineTo(x + 20, y + 12);
            ctx.lineTo(x + 10, y + 18);
            ctx.lineTo(x, y + 12);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + 10, y - 6);
            ctx.lineTo(x + 10, y + 6);
            ctx.lineTo(x + 20, y + 12);
            ctx.moveTo(x + 10, y + 6);
            ctx.lineTo(x, y + 12);
            ctx.stroke();
          }
        }
      }
    } else if (style === 2) {
      // Concentric arcs
      const cx = W / 2, cy = H / 2;
      for (let r = 10; r < Math.max(W, H); r += 14) {
        ctx.globalAlpha = 0.15 + rnd(r) * 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r, rnd(r) * Math.PI, rnd(r + 1) * Math.PI + Math.PI);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    } else if (style === 3) {
      // Waveform
      for (let i = 0; i < 200; i++) {
        const x = (i / 200) * W;
        const amp = 10 + rnd(i) * 60;
        ctx.strokeStyle = `rgba(79, 195, 255, ${0.15 + rnd(i) * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(x, H / 2 - amp);
        ctx.lineTo(x, H / 2 + amp);
        ctx.stroke();
      }
    } else {
      // Blueprint grid + code
      ctx.strokeStyle = 'rgba(79, 195, 255, 0.15)';
      for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(79, 195, 255, 0.5)';
      ctx.strokeRect(W * 0.2, H * 0.2, W * 0.6, H * 0.6);
      ctx.strokeRect(W * 0.3, H * 0.3, W * 0.2, H * 0.4);
      ctx.strokeRect(W * 0.55, H * 0.35, W * 0.15, H * 0.2);
      ctx.font = '10px JetBrains Mono';
      ctx.fillStyle = 'rgba(79, 195, 255, 0.6)';
      ctx.fillText('0x' + (index * 137).toString(16), W * 0.2, H * 0.2 - 4);
      ctx.fillText('SCALE 1:' + (1 + index), W * 0.2, H - 6);
    }

    // Corner tag
    ctx.font = '10px JetBrains Mono';
    ctx.fillStyle = 'rgba(79, 195, 255, 0.7)';
    ctx.fillText('№' + String(index + 1).padStart(3, '0'), 10, 18);
  }, [index]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.55,
        filter: 'grayscale(0.3) contrast(1.1) brightness(0.8) hue-rotate(180deg) saturate(1.5)',
      }}
    />
  );
}
