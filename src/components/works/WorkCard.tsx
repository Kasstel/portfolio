import { useRef } from 'react';
import { WorkCardCanvas } from './WorkCardCanvas';
import styles from './WorkCard.module.css';

type CardSize = 'lg' | 'md' | 'sm' | 'full';

interface WorkCardProps {
  index: number;
  size: CardSize;
  number: string;      // "№ 001"
  year?: string;
  caseLabel?: string;   // "CASE-A"
  title: string;
  description?: string;
  tags: string[];
  videoSrc?: string;
}

const sizeClass: Record<CardSize, string> = {
  lg: styles.lg,
  md: styles.md,
  sm: styles.sm,
  full: styles.full,
};

export function WorkCard({
  index,
  size,
  number,
  year,
  caseLabel,
  title,
  description,
  tags,
  videoSrc,
}: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preview plays only while the card is hovered
  const playPreview = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => { /* interrupted by a quick leave */ });
  };

  const stopPreview = () => {
    videoRef.current?.pause();
  };

  return (
    <article
      className={`${styles.card} ${sizeClass[size]}`}
      onPointerEnter={playPreview}
      onPointerLeave={stopPreview}
    >
      <WorkCardCanvas index={index} />

      {videoSrc && (
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      <div className={styles.overlay} />

      {/* Corner tick marks */}
      <div className={styles.ticks}><i /></div>

      <div className={styles.meta}>
        <div className={styles.top}>
          <span>{number}{year ? ` · ${year}` : ''}</span>
          {caseLabel && <span>{caseLabel}</span>}
        </div>
        <div className={styles.bot}>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map(t => <span key={t}>{t}</span>)}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
