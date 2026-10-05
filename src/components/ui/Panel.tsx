import { type ReactNode, type CSSProperties } from 'react';
import styles from './Panel.module.css';

interface PanelProps {
  children: ReactNode;
  label?: string;
  labelRight?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Panel — bordered container with corner tick marks and optional labels.
 * Matches original `.panel` exactly.
 */
export function Panel({ children, label, labelRight, className = '', style }: PanelProps) {
  return (
    <div className={`${styles.panel} ${className}`} style={style}>
      {/* Four corner tick marks */}
      <span className={styles.cTr} />
      <span className={styles.cBl} />

      {label && <span className={styles.label}>{label}</span>}
      {labelRight && <span className={styles.labelR}>{labelRight}</span>}

      {children}
    </div>
  );
}
