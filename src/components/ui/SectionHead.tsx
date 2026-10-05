import styles from './SectionHead.module.css';

interface SectionHeadProps {
  index: string;      // "01", "02", etc.
  title: string;      // "WORKS.DB"
  jp?: string;        // Japanese subtitle
  rightTop?: string;  // Right-side info line 1
  rightBottom?: string; // Right-side info line 2
}

export function SectionHead({ index, title, jp, rightTop, rightBottom }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <div className={styles.left}>
        <span className={styles.index}>{index}</span>
        <span className={styles.title}>{title}</span>
        {jp && <span className={styles.jp}>{jp}</span>}
      </div>
      {(rightTop || rightBottom) && (
        <div className={styles.right}>
          {rightTop && <span>{rightTop}</span>}
          {rightBottom && <><br /><span>{rightBottom}</span></>}
        </div>
      )}
    </div>
  );
}
