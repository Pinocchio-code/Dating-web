import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { ShieldCheck, CheckCircle2, FileText, Smartphone, Building, Sparkles, Heart } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface PaymentStepProps {
  paymentMethod: PaymentMethod;
  contractSigned: boolean;
  signatureText: string;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onToggleContractSigned: (signed: boolean) => void;
  onUpdateSignature: (sig: string) => void;
  onNext: () => void;
  sweetheartName: string;
  admirerName: string;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  paymentMethod,
  contractSigned,
  signatureText,
  onSelectPaymentMethod,
  onToggleContractSigned,
  onUpdateSignature,
  onNext,
  sweetheartName,
  admirerName,
}) => {
  const [agreementChecked, setAgreementChecked] = useState<boolean>(true);

  const isFormValid = Boolean(contractSigned || (agreementChecked && signatureText.trim().length > 0));

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
          Payment Contract & Method 📜💳
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Pick your preferred funding channel: <span className="font-semibold text-rose-600">Telebirr</span> or{' '}
          <span className="font-semibold text-purple-700">CBE</span>.
        </p>
      </div>

      {/* Payment Channel Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Telebirr Option */}
        <button
          type="button"
          onClick={() => {
            soundFX.playChime();
            onSelectPaymentMethod('telebirr');
          }}
          className={`p-4 rounded-2xl text-left border transition-all relative cursor-pointer ${
            paymentMethod === 'telebirr'
              ? 'bg-amber-50/70 border-amber-500 shadow-sm ring-2 ring-amber-400/40'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#008DD2]/10 text-[#008DD2] flex items-center justify-center font-bold text-xs">
                <Smartphone className="w-5 h-5 text-[#008DD2]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  Telebirr
                </h3>
                <span className="text-[11px] font-semibold text-amber-600">
                  Ethio Telecom Mobile Money
                </span>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                paymentMethod === 'telebirr'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'border border-slate-300 bg-white text-transparent'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-600 space-y-1">
            <p>• <strong>Biller:</strong> Admirer&apos;s Telebirr account</p>
            <p>• <strong>Sweetheart Share:</strong> <span className="text-emerald-600 font-bold">0.00 ETB (100% Free)</span></p>
            <p>• <strong>Processing Speed:</strong> Instant QR / PIN settlement</p>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-200/50 flex items-center gap-1.5 text-[10px] text-amber-800 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Official &ldquo;Telebirr Date Sponsor&rdquo; Contract</span>
          </div>
        </button>

        {/* CBE Option */}
        <button
          type="button"
          onClick={() => {
            soundFX.playChime();
            onSelectPaymentMethod('cbe');
          }}
          className={`p-4 rounded-2xl text-left border transition-all relative cursor-pointer ${
            paymentMethod === 'cbe'
              ? 'bg-purple-50/70 border-purple-500 shadow-sm ring-2 ring-purple-400/40'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#662D91]/10 text-[#662D91] flex items-center justify-center font-bold text-xs">
                <Building className="w-5 h-5 text-[#662D91]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  CBE Birr / CBE
                </h3>
                <span className="text-[11px] font-semibold text-purple-700">
                  Commercial Bank of Ethiopia
                </span>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                paymentMethod === 'cbe'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'border border-slate-300 bg-white text-transparent'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-600 space-y-1">
            <p>• <strong>Biller:</strong> Admirer&apos;s CBE Account</p>
            <p>• <strong>Sweetheart Share:</strong> <span className="text-emerald-600 font-bold">0.00 ETB (Priceless)</span></p>
            <p>• <strong>Reliability:</strong> &ldquo;The Bank You Can Always Rely On&rdquo;</p>
          </div>

          <div className="mt-3 pt-2 border-t border-purple-200/50 flex items-center gap-1.5 text-[10px] text-purple-800 font-medium">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>Official &ldquo;CBE Romance Bond&rdquo; Guarantee</span>
          </div>
        </button>
      </div>

      {/* The Romantic Legal Contract Card */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-200/90 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-base">
            <FileText className="w-4 h-4 text-rose-500" />
            <span>Romantic Financing Agreement & Terms</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Legally Binding Under Ministry of Romance</span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-600 font-normal leading-relaxed">
          <p>
            <strong>Clause 1 (The Zero-Birr Rule):</strong> The party designated as{' '}
            <span className="text-rose-600 font-semibold">{sweetheartName || 'Sweetheart'}</span> shall under NO circumstances open their wallet, bag, or mobile app to pay for anything during this date.
          </p>
          <p>
            <strong>Clause 2 (Total Sponsorship):</strong> The admirer{' '}
            <span className="text-slate-900 font-semibold">{admirerName || 'Your Date'}</span> agrees to cover 100% of all food, drinks, admission tickets, arcade tokens, and dessert via{' '}
            <span className="font-semibold uppercase text-slate-800">{paymentMethod}</span>.
          </p>
          <p>
            <strong>Clause 3 (Sweetheart&apos;s Sole Obligation):</strong> Sweetheart agrees only to show up, look gorgeous, laugh at funny jokes, and enjoy the day to the fullest.
          </p>
        </div>

        {/* Contract Sign-off Box */}
        <div className="mt-4 pt-3 border-t border-rose-100">
          <label className="flex items-start gap-2.5 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
            />
            <span className="text-xs text-slate-800 font-medium">
              I agree to all clauses and accept full VIP treatment on this date 💕
            </span>
          </label>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Sweetheart&apos;s Digital Signature / Initials:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={signatureText}
                onChange={(e) => onUpdateSignature(e.target.value)}
                placeholder="Type your name or initials to seal contract..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-serif text-slate-900 italic focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                type="button"
                onClick={() => {
                  soundFX.playChime();
                  onUpdateSignature(sweetheartName || 'Sweetheart ❤️');
                  onToggleContractSigned(true);
                }}
                className="whitespace-nowrap px-3 py-2 text-xs font-semibold bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl transition-colors cursor-pointer"
              >
                Auto-Sign ✍️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final Action Button: Grant Date & Issue Receipt */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={() => {
            soundFX.playStamp();
            onNext();
          }}
          className={`w-full py-4 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isFormValid
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-500/25 active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Approve & Grant Official Date Receipt</span>
          <span>🎉</span>
        </button>
      </div>
    </div>
  );
};
