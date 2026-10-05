import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './BootScreen.module.css';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { tag: '[BIOS]',  text: 'SYS-MARK VII  rev.0x4A21  boot_seq init...' },
  { tag: '[MEM]',   text: 'mapping 64K..1024M  <span class="ok">OK</span>' },
  { tag: '[NET]',   text: 'eth0 link up  <span class="ok">OK</span>  latency 12ms' },
  { tag: '[IDENT]', text: 'subject lookup: <span class="br">LUNEV.NIKITA</span>  handle: @kasstel03' },
  { tag: '[AUTH]',  text: 'retinal scan  <span class="ok">MATCH</span>  clearance: TIER-03' },
  { tag: '[LOAD]',  text: 'frontend.runtime  <span class="ok">READY</span>' },
  { tag: '[LOAD]',  text: 'portfolio/works.db  42 entries  <span class="ok">OK</span>' },
  { tag: '[WARN]',  text: 'crt.flicker enabled — unstable visuals expected', isWarn: true },
  { tag: '[SYS]',   text: 'mounting interface...' },
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [lines, setLines] = useState<typeof BOOT_LINES>([]);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setDone(true);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  // Boot tick sequence
  useEffect(() => {
    let timeoutId: number;

    function tick() {
      if (indexRef.current < BOOT_LINES.length) {
        const i = indexRef.current++;
        setLines(prev => [...prev, BOOT_LINES[i]]);
        setPct(Math.floor((indexRef.current / BOOT_LINES.length) * 100));
        timeoutId = window.setTimeout(tick, 180 + Math.random() * 220);
      } else {
        timeoutId = window.setTimeout(finish, 500);
      }
    }

    // Small initial delay
    timeoutId = window.setTimeout(tick, 200);

    return () => clearTimeout(timeoutId);
  }, [finish]);

  return (
    <div
      className={`${styles.boot} ${done ? styles.done : ''}`}
      onClick={finish}
    >
      <div className={styles.head}>
        <span>SYS-MARK VII // boot_sequence</span>
        <span>{pct}%</span>
      </div>

      <div className={styles.big}>LOADING<span className="caret" /></div>

      <div className={styles.progress}>
        <span>PROGRESS</span>
        <div className={styles.bar} style={{ '--p': `${pct}%` } as React.CSSProperties} />
      </div>

      <div className={styles.stream}>
        {lines.map((ln, i) => (
          <div key={i}>
            <span className={styles.dim}>{ln.tag}</span>{' '}
            <span dangerouslySetInnerHTML={{ __html: ln.text }} />
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span>CLICK ANYWHERE TO SKIP</span>
        <span>NODE-034  //  SECURE CHANNEL  //  v0x1A</span>
      </div>
    </div>
  );
}
