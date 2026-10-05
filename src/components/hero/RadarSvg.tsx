import { useRef, useEffect } from 'react';

export function RadarSvg() {
  const sweepRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const sweep = sweepRef.current;
    if (!sweep) return;

    let a = 0;
    let rafId: number;

    function spin() {
      a = (a + 1.2) % 360;
      sweep!.setAttribute('transform', `rotate(${a} 100 100)`);
      rafId = requestAnimationFrame(spin);
    }

    rafId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4fc3ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4fc3ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circles */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#2a7a9a" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="65" fill="none" stroke="#2a7a9a" strokeWidth="0.5" strokeDasharray="2 3" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#2a7a9a" strokeWidth="0.5" strokeDasharray="2 3" />

      {/* Crosshairs */}
      <line x1="10" y1="100" x2="190" y2="100" stroke="#1a3a4a" strokeWidth="0.5" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="#1a3a4a" strokeWidth="0.5" />

      {/* Sweep line */}
      <line
        ref={sweepRef}
        x1="100" y1="100" x2="100" y2="12"
        stroke="url(#rg)"
        strokeWidth="2"
      />

      {/* Blips */}
      <circle cx="130" cy="60" r="3" fill="#4fc3ff" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="130" r="2" fill="#4fc3ff" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="145" cy="110" r="2.5" fill="#4fc3ff" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="70" r="2" fill="#ff3860" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Center dot */}
      <circle cx="100" cy="100" r="3" fill="#4fc3ff" opacity="0.9" />

      {/* Labels */}
      <text x="14" y="16" fill="#2a7a9a" fontSize="8" fontFamily="JetBrains Mono, monospace">SCAN</text>
      <text x="160" y="195" fill="#2a7a9a" fontSize="8" fontFamily="JetBrains Mono, monospace">R:90px</text>
    </svg>
  );
}
