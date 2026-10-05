import { useState, useCallback } from 'react';
import { SectionHead } from '../components/ui/SectionHead';
import { Panel } from '../components/ui/Panel';
import styles from './Contact.module.css';

interface CopyButtonProps {
  value: string;
}

function CopyButton({ value }: CopyButtonProps) {
  const [label, setLabel] = useState('COPY');
  const [ok, setOk] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setLabel('COPIED');
      setOk(true);
      setTimeout(() => {
        setLabel('COPY');
        setOk(false);
      }, 1400);
    } catch {
      setLabel('ERR');
    }
  }, [value]);

  return (
    <button
      className={`${styles.copy} ${ok ? styles.copyOk : ''}`}
      onClick={handleCopy}
    >
      {label}
    </button>
  );
}

export function Contact() {
  return (
    <section className={styles.section} id="contact">
      <SectionHead
        index="06"
        title="OPEN.CHANNEL"
        jp="接続 / コンタクト"
        rightTop="ENCRYPTION: TLS · E2E"
        rightBottom="AVG RESPONSE < 12h"
      />

      <div className={styles.contact}>
        {/* ─── CHANNELS ─── */}
        <Panel label="CHANNELS" className={styles.card}>
          <div className={styles.cRow}>
            <span className={styles.k}>TELEGRAM</span>
            <span className={`${styles.v} glitchable`}>@kasstel03</span>
            <CopyButton value="@kasstel03" />
          </div>
          <div className={styles.cRow}>
            <span className={styles.k}>PHONE</span>
            <span className={`${styles.v} glitchable`}>+7 980 370-50-10</span>
            <CopyButton value="+79803705010" />
          </div>
          <div className={styles.cRow}>
            <span className={styles.k}>Github Profile</span>
            <a
              href="https://github.com/Kasstel"
              target="_blank"
              rel="noopener"
              className={`${styles.v} glitchable`}
            >
              github.com/Kasstel ↗
            </a>
            <CopyButton value="https://github.com/Kasstel" />
          </div>
          <div className={styles.cRow} style={{ border: 0 }}>
            <span className={styles.k}>AVAILABLE</span>
            <span className={styles.v}>
              <span style={{ color: 'var(--green)' }}>● READY FOR CONTRACT</span>
            </span>
            <span>·</span>
          </div>

          <div className={styles.note}>
            Пришлите задачу, сроки и бюджет. В течение суток дам оценку и план работы.
          </div>
        </Panel>

        {/* ─── TERMINAL SESSION ─── */}
        <Panel label="TERM.SESSION" labelRight="/dev/tty" className={styles.card}>
          <div style={{ color: 'var(--phosphor-dim)', fontSize: 'var(--fs-sm)' }}>
            // последняя сессия
          </div>
          <pre className={styles.term}>
{`\x1b[32msubject@node-034\x1b[0m:~/portfolio$ whoami`}
          </pre>
          <pre className={styles.term}>
            <span className={styles.pr}>subject@node-034</span>:<span className="ph">~/portfolio</span>$ whoami{'\n'}
            <span className="hi">nikita lunev // frontend</span>{'\n'}
            {'\n'}
            <span className={styles.pr}>subject@node-034</span>:<span className="ph">~/portfolio</span>$ cat mission.txt{'\n'}
            <span className={styles.termDim}>— собирать интерфейсы, от которых не хочется</span>{'\n'}
            <span className={styles.termDim}>  отрывать глаза</span>{'\n'}
            <span className={styles.termDim}>— внимание к детали дороже скорости</span>{'\n'}
            <span className={styles.termDim}>— любая идея может стать прототипом за день</span>{'\n'}
            {'\n'}
            <span className={styles.pr}>subject@node-034</span>:<span className="ph">~/portfolio</span>$ contact --now{'\n'}
            <span className="hi">→ opening channel...</span>{'\n'}
            <span className="caret" />
          </pre>
        </Panel>
      </div>
    </section>
  );
}
