import React, { useMemo } from 'react';

export const RomanticBackground: React.FC = () => {
  // Generate random hearts for floating background
  const hearts = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.random() * 4) % 96}%`,
      delay: `${(i * 1.4) % 12}s`,
      duration: `${14 + (i % 6) * 2.5}s`,
      size: `${12 + (i % 5) * 6}px`,
      symbol: ['❤️', '💖', '✨', '💕', '🌸', '🧸'][i % 6],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient blurs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />

      {/* Floating gentle romantic particles */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-40px] animate-float-heart select-none text-rose-300/40 dark:text-rose-400/20"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
};
