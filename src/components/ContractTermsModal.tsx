import React from 'react';
import { X, FileText, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface ContractTermsModalProps {
  isOpen: boolean;
  sweetheartName: string;
  admirerName: string;
  paymentMethod: string;
  onClose: () => void;
}

export const ContractTermsModal: React.FC<ContractTermsModalProps> = ({
  isOpen,
  sweetheartName,
  admirerName,
  paymentMethod,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-rose-200 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base leading-tight">
                Romance Contract Terms
              </h3>
              <p className="text-[11px] text-slate-500">
                Official Ministry of Romance &bull; Couple Maber
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-rose-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3.5 text-xs text-slate-700 leading-relaxed">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-emerald-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Sponsor Guarantee via {paymentMethod.toUpperCase()}</span>
          </div>

          <p>
            <strong>Clause 1 (Zero-Birr Rule):</strong> The party designated as{' '}
            <span className="text-rose-600 font-bold">{sweetheartName || 'Sweetheart'}</span> shall under NO circumstances open their wallet, purse, or mobile banking app to pay for anything during this date.
          </p>

          <p>
            <strong>Clause 2 (Total Sponsorship):</strong> The admirer{' '}
            <span className="text-slate-900 font-bold">{admirerName || 'Your Date'}</span> agrees to cover 100% of all meals, beverages, venue tickets, arcade tokens, and dessert via{' '}
            <span className="font-semibold uppercase text-slate-900">{paymentMethod}</span>.
          </p>

          <p>
            <strong>Clause 3 (Sweetheart&apos;s Sole Obligation):</strong> Sweetheart agrees only to show up, look gorgeous, laugh at funny jokes, and enjoy the day to the fullest.
          </p>

          <p>
            <strong>Clause 4 (Dispute Settlement):</strong> Any disagreement shall be promptly settled with immediate dessert, genuine compliments, or warm hugs.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Binding with Love</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Understood &amp; Agree</span>
          </button>
        </div>
      </div>
    </div>
  );
};
