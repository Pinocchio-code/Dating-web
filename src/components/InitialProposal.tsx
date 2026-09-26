import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Sparkles, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { NO_BUTTON_PHRASES } from '../data/dateOptions';
import { soundFX } from '../utils/audio';

interface InitialProposalProps {
  onSayYes: () => void;
  sweetheartName: string;
}

export const InitialProposal: React.FC<InitialProposalProps> = ({
  onSayYes,
  sweetheartName,
}) => {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [currentPhrase, setCurrentPhrase] = useState<string>("No 🙈");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hasStartedDodging, setHasStartedDodging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Toggle sound
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
  };

  // Safe dodging mechanism for both mobile and desktop
  const moveNoButton = useCallback(() => {
    setHasStartedDodging(true);
    soundFX.playDodge();
    
    // Choose a random phrase
    const randomIndex = Math.floor(Math.random() * NO_BUTTON_PHRASES.length);
    setCurrentPhrase(NO_BUTTON_PHRASES[randomIndex]);
    setDodgeCount((prev) => prev + 1);

    // Calculate boundary within viewport
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 400;
    const isMobile = viewportWidth < 640;

    // Range for dodging
    const maxX = isMobile ? 120 : 260;
    const maxY = isMobile ? 140 : 180;

    // Generate non-zero random coordinates
    let newX = (Math.random() * 2 - 1) * maxX;
    let newY = (Math.random() * 2 - 1) * maxY;

    // Avoid landing in the exact same spot
    if (Math.abs(newX) < 40) newX = newX < 0 ? -60 : 60;
    if (Math.abs(newY) < 30) newY = newY < 0 ? -50 : 50;

    setNoPosition({ x: newX, y: newY });
  }, []);

  // Yes button scale grows slightly with each failed "No" attempt
  const yesScale = Math.min(1 + dodgeCount * 0.08, 1.6);

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-6 md:py-12">
      {/* Sound toggle in corner */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute top-2 right-4 text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-slate-600 shadow-sm border border-rose-100 transition-colors"
        title={soundEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {soundEnabled ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Sound On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            <span>Sound Muted</span>
          </>
        )}
      </button>

      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs md:text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Official Romance Inquiry</span>
        <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      {/* Hero Illustration */}
      <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-xl ring-4 ring-rose-200/70 mb-6 bg-gradient-to-tr from-rose-100 to-pink-50 flex items-center justify-center">
        <img
          src="/src/assets/images/date_hero_art_1790420881730.jpg"
          alt="Sweethearts together"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Graceful fallback to styled icon if image loading has issues
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <Heart className="w-16 h-16 text-rose-400 fill-rose-300 animate-pulse" />
        </div>
      </div>

      {/* The Central Question */}
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight mb-3">
        Will you go on a date with me,{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">
          {sweetheartName || 'sweetheart'}?
        </span>
      </h1>

      <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto mb-8 font-normal">
        A very important decision awaits! Only one of these buttons is truly accepting answers... 💕
      </p>

      {/* Dodge count humor note if user is persistently chasing "No" */}
      {dodgeCount > 0 && (
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs animate-bounce">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>
            {dodgeCount === 1
              ? "Did you really try to click No?! 😱"
              : `Attempted 'No' escapes: ${dodgeCount} time${dodgeCount > 1 ? 's' : ''}! Just say Yes 🥰`}
          </span>
        </div>
      )}

      {/* Interactive Choice Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-md min-h-[160px] flex items-center justify-center gap-6 mt-2"
      >
        {/* The YES Button */}
        <button
          type="button"
          onClick={() => {
            soundFX.playChime();
            onSayYes();
          }}
          style={{ transform: `scale(${yesScale})` }}
          className="relative group z-10 px-8 py-3.5 md:px-10 md:py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-base md:text-lg shadow-lg shadow-rose-500/25 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2"
        >
          <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
          <span>YES! Absolutely ❤️</span>
        </button>

        {/* The Evasive NO Button */}
        <div
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className={`${hasStartedDodging ? 'absolute z-20' : 'relative z-10'}`}
        >
          {/* Playful evasion bubble when dodging */}
          {hasStartedDodging && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-full shadow-md animate-pulse">
              {currentPhrase}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
            </div>
          )}

          <button
            ref={noButtonRef}
            type="button"
            onMouseEnter={moveNoButton}
            onMouseMove={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            onClick={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            tabIndex={-1}
            className="px-6 py-3 md:px-7 md:py-3.5 rounded-2xl bg-slate-200/90 hover:bg-slate-300 text-slate-700 font-medium text-sm md:text-base border border-slate-300 shadow-sm transition-colors cursor-not-allowed select-none min-w-[100px]"
          >
            No 💔
          </button>
        </div>
      </div>

      <div className="mt-8 text-xs text-slate-400">
        Hint: Destiny has already chosen the right button for you ✨
      </div>
    </div>
  );
};
