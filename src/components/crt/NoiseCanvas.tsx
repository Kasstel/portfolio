import { useRef, useEffect } from 'react';
import styles from './CrtOverlay.module.css';

/**
 * Live animated noise grain rendered on a canvas at half resolution.
 * Runs at ~30fps (every other frame) for performance.
 */
export function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let frame = 0;
    let rafId: number;

    function resize() {
      W = canvas!.width = Math.floor(window.innerWidth / 2);
      H = canvas!.height = Math.floor(window.innerHeight / 2);
      canvas!.style.width = window.innerWidth + 'px';
      canvas!.style.height = window.innerHeight + 'px';
    }

    function draw() {
      frame++;
      // Only draw every other frame → ~30fps
      if (frame % 2 === 0) {
        const img = ctx!.createImageData(W, H);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = 40 + ((Math.random() * 40) | 0);
        }
        ctx!.putImageData(img, 0, 0);
      }
      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.noise} />;
}
