import { useRef, useCallback, type ReactNode } from 'react';
import styles from './DraggableWindow.module.css';

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
}

export function DraggableWindow({ title, children }: DraggableWindowProps) {
  const winRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const win = winRef.current;
    if (!win) return;

    dragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    const rect = win.getBoundingClientRect();
    const parent = win.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0 };
    offsetX.current = rect.left - parent.left;
    offsetY.current = rect.top - parent.top;

    win.style.left = offsetX.current + 'px';
    win.style.top = offsetY.current + 'px';
    win.style.right = 'auto';
    document.body.style.userSelect = 'none';

    e.preventDefault();

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      win.style.left = (offsetX.current + ev.clientX - startX.current) + 'px';
      win.style.top = (offsetY.current + ev.clientY - startY.current) + 'px';
    };

    const onUp = () => {
      dragging.current = false;
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, []);

  return (
    <div ref={winRef} className={styles.win}>
      <div className={styles.bar} onMouseDown={onMouseDown}>
        <span className={styles.dots}>
          <i /><i /><i />
        </span>
        <span>{title}</span>
        <span>DRAG ME</span>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}
