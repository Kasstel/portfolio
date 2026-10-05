import { type ReactNode } from 'react';
import styles from './TermButton.module.css';

interface TermButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export function TermButton({ children, href, onClick, external }: TermButtonProps) {
  const className = `${styles.btn} glitchable`;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      >
        <span className={styles.caret}>&gt;</span>
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      <span className={styles.caret}>&gt;</span>
      {children}
    </button>
  );
}
