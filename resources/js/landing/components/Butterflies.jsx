import React from 'react';

const ButterflyIcon = ({ fill1, fill2, size = 32 }) => (
  <svg width={size} height={Math.round(size * 0.875)} viewBox="0 0 32 28" fill="none">
    <ellipse cx="10" cy="10" rx="9" ry="6" fill={fill1} transform="rotate(-20 10 10)" opacity="0.8"/>
    <ellipse cx="10" cy="18" rx="7" ry="4" fill={fill2} transform="rotate(20 10 18)" opacity="0.8"/>
    <ellipse cx="22" cy="10" rx="9" ry="6" fill={fill1} transform="rotate(20 22 10)" opacity="0.8"/>
    <ellipse cx="22" cy="18" rx="7" ry="4" fill={fill2} transform="rotate(-20 22 18)" opacity="0.8"/>
    <line x1="16" y1="4" x2="16" y2="24" stroke="#4b5563" strokeWidth="1.5"/>
  </svg>
);

export default function Butterflies() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <div className="absolute top-1/4" style={{ opacity: 0.5, animation: 'flyAcross 18s linear infinite' }}>
        <div style={{ animation: 'flutter 2.5s ease-in-out infinite' }}>
          <ButterflyIcon fill1="#f472b6" fill2="#fb7185" size={32} />
        </div>
      </div>
      <div className="absolute top-1/2" style={{ opacity: 0.5, animation: 'flyAcross 24s linear infinite 6s' }}>
        <div style={{ animation: 'flutter 2.5s ease-in-out infinite 0.5s' }}>
          <ButterflyIcon fill1="#facc15" fill2="#fbbf24" size={28} />
        </div>
      </div>
      <div className="absolute top-3/4" style={{ opacity: 0.45, animation: 'flyAcross 20s linear infinite 12s' }}>
        <div style={{ animation: 'flutter 2.5s ease-in-out infinite 1s' }}>
          <ButterflyIcon fill1="#2dd4bf" fill2="#14b8a6" size={24} />
        </div>
      </div>
      <style>{`
        @keyframes flyAcross {
          0% { transform: translateX(-80px) translateY(30px); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateX(110vw) translateY(-60px); opacity: 0; }
        }
        @keyframes flutter {
          0%, 100% { transform: translateY(0) rotate(-5deg) scaleX(1); }
          25% { transform: translateY(-12px) rotate(5deg) scaleX(-1); }
          50% { transform: translateY(-6px) rotate(-3deg) scaleX(1); }
          75% { transform: translateY(-18px) rotate(8deg) scaleX(-1); }
        }
      `}</style>
    </div>
  );
}
