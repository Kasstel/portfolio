import { NoiseCanvas } from './NoiseCanvas';
import styles from './CrtOverlay.module.css';

/**
 * Complete CRT effect system — 6 layers stacked over the entire viewport.
 * All pointer-events: none, purely decorative.
 *
 * Layers (bottom to top):
 *  1. crt-glow      — subtle phosphor radial glow
 *  2. scanlines      — repeating horizontal lines
 *  3. vignette       — dark edges
 *  4. scan-moving    — slow blue band sweeping down
 *  5. noise (canvas) — live animated grain
 *  6. crt-roll       — faint rolling white band
 */
export function CrtOverlay() {
  return (
    <>
      <div className={styles.glow} />
      <div className={styles.scanlines} />
      <div className={styles.vignette} />
      <div className={styles.scanMoving} />
      <NoiseCanvas />
      <div className={styles.roll} />
    </>
  );
}
