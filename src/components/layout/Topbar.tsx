import { useState, useEffect, useRef } from 'react';
import styles from './Topbar.module.css';

export function Topbar() {
  const [clock, setClock] = useState('————');
  const [coords, setCoords] = useState('X:0000 Y:0000');
  const rafScheduled = useRef(false);
  const mx = useRef(0);
  const my = useRef(0);

  // Live UTC clock
  useEffect(() => {
    function update() {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      setClock(
        `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())} ` +
        `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Cursor position HUD (RAF-throttled)
  useEffect(() => {
    function onMove(e: MouseEvent) {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (!rafScheduled.current) {
        rafScheduled.current = true;
        requestAnimationFrame(() => {
          setCoords(
            `X:${String(mx.current).padStart(4, '0')} Y:${String(my.current).padStart(4, '0')}`
          );
          rafScheduled.current = false;
        });
      }
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <span><span className={styles.dot} />LINK ACTIVE</span>
        <span>NODE-034</span>
        <span>RT-12ms</span>
        <span>{coords}</span>
      </div>
      <div className={styles.center}>LUNEV N. / Portfolio</div>
      <div className={styles.right}>
        <span>{clock}</span>
        <span>CH 03 // SECURE</span>
      </div>
    </div>
  );
}
