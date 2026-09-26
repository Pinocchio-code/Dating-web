import React from 'react';
import { Heart, CheckCircle2, Sparkles, Smile } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ConfirmYesModalProps {
  isOpen: boolean;
  sweetheartName: string;
  admirerName: string;
  onUpdateSweetheartName: (name: string) => void;
  onUpdateAdmirerName: (name: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmYesModal: React.FC<ConfirmYesModalProps> = ({
  isOpen,
  sweetheartName,
  admirerName,
  onUpdateSweetheartName,
  onUpdateAdmirerName,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-rose-100 transform transition-all">
        {/* Floating Heart Icon */}
        <div className="w-16 h-16 mx-auto -mt-12 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30 transform rotate-3">
          <Heart className="w-8 h-8 text-white fill-white animate-bounce" />
        </div>

        {/* Header */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Official Affirmation Protocol</span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Confirm You Said YES! 🥰
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Wait... did you really click YES?! We need formal confirmation: No takebacks, sealed with a pinky promise! 🤞❤️
          </p>
        </div>

        {/* Personalization Inputs */}
        <div className="mt-5 space-y-3.5 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sweetheart&apos;s Name / Nickname:
            </label>
            <input
              type="text"
              value={sweetheartName}
              onChange={(e) => onUpdateSweetheartName(e.target.value)}
              placeholder="e.g. Sweetheart, Maya, Selam, Babe..."
              className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-rose-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Admirer / Date Partner&apos;s Name:
            </label>
            <input
              type="text"
              value={admirerName}
              onChange={(e) => onUpdateAdmirerName(e.target.value)}
              placeholder="e.g. Your Admirer, Robel, Danny..."
              className="w-full px-3.5 py-2 text-sm bg-white rounded-xl border border-rose-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Fun Clause Check */}
        <div className="mt-4 p-3 bg-amber-50/70 rounded-xl border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2.5">
          <Smile className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            By confirming, you unlock date planning privileges, delicious snacks, and 100% sponsored happiness!
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundFX.playChime();
              onConfirm();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm shadow-md shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Solemnly Confirm YES! 💕</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 px-4 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Wait, let me rethink (just kidding, you can&apos;t!)
          </button>
        </div>
      </div>
    </div>
  );
};
