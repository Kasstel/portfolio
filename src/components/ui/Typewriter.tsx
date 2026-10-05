import { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * Typewriter text animation.
 * `speed` base is 18ms per char (matching original).
 * Adds random jitter for realistic feel.
 */
export function Typewriter({ text, delay = 0, speed = 18, className = '', onComplete }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    indexRef.current = 0;
    setDisplayed('');
    setDone(false);

    let timeoutId: number;

    function tick() {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        setDone(true);
        onCompleteRef.current?.();
        return;
      }

      const charDelay = speed + Math.random() * 20;
      timeoutId = window.setTimeout(tick, charDelay);
    }

    timeoutId = window.setTimeout(tick, speed);
    return () => clearTimeout(timeoutId);
  }, [text, speed, started]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="caret" />}
    </span>
  );
}
