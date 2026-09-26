import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { CheckCircle2, Smartphone, Building, Heart, FileText } from 'lucide-react';
import { ContractTermsModal } from './ContractTermsModal';
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
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);

  const isFormValid = Boolean(contractSigned || (agreementChecked && signatureText.trim().length > 0));

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
          Payment Contract &amp; Method 📜💳
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Pick your preferred funding channel: <span className="font-semibold text-rose-600">Telebirr</span> or{' '}
          <span className="font-semibold text-purple-700">CBE</span>.
        </p>
      </div>

      {/* Payment Channel Selection */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Telebirr Option */}
        <button
          type="button"
          onClick={() => {
            soundFX.playChime();
            onSelectPaymentMethod('telebirr');
          }}
          className={`p-3 rounded-2xl text-left border transition-all relative cursor-pointer ${
            paymentMethod === 'telebirr'
              ? 'bg-amber-50/70 border-amber-500 shadow-xs ring-2 ring-amber-400/40'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-[#008DD2]/10 text-[#008DD2] flex items-center justify-center font-bold">
              <Smartphone className="w-4 h-4 text-[#008DD2]" />
            </div>

            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                paymentMethod === 'telebirr'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'border border-slate-300 bg-white text-transparent'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-sm leading-tight">
            Telebirr
          </h3>
          <span className="text-[10px] font-semibold text-amber-600 block">
            Ethio Telecom
          </span>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            0.00 ETB for Sweetheart
          </span>
        </button>

        {/* CBE Option */}
        <button
          type="button"
          onClick={() => {
            soundFX.playChime();
            onSelectPaymentMethod('cbe');
          }}
          className={`p-3 rounded-2xl text-left border transition-all relative cursor-pointer ${
            paymentMethod === 'cbe'
              ? 'bg-purple-50/70 border-purple-500 shadow-xs ring-2 ring-purple-400/40'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-8 h-8 rounded-xl bg-[#662D91]/10 text-[#662D91] flex items-center justify-center font-bold">
              <Building className="w-4 h-4 text-[#662D91]" />
            </div>

            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                paymentMethod === 'cbe'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'border border-slate-300 bg-white text-transparent'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3 className="font-bold text-slate-900 text-sm leading-tight">
            CBE Birr
          </h3>
          <span className="text-[10px] font-semibold text-purple-700 block">
            Commercial Bank
          </span>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            0.00 ETB (100% Covered)
          </span>
        </button>
      </div>

      {/* The Romantic Legal Contract Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-200/90 relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs sm:text-sm">
            <FileText className="w-4 h-4 text-rose-500" />
            <span>Romantic Financing Guarantee</span>
          </div>

          <button
            type="button"
            onClick={() => setIsTermsModalOpen(true)}
            className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold underline underline-offset-2 cursor-pointer"
          >
            View Terms (Popup) 📜
          </button>
        </div>

        <div className="p-2.5 bg-rose-50/50 rounded-xl border border-rose-100 text-xs text-slate-700 mb-3 space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Biller:</span>
            <span className="font-semibold text-slate-900">{admirerName || 'Your Admirer'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Beneficiary:</span>
            <span className="font-semibold text-rose-600">{sweetheartName || 'Sweetheart'} (0.00 ETB)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Financing Method:</span>
            <span className="font-bold uppercase text-slate-900">{paymentMethod} Mobile</span>
          </div>
        </div>

        {/* Contract Sign-off Box */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer mb-2.5">
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
            />
            <span className="text-xs text-slate-800 font-medium leading-tight">
              I agree to all romance clauses and accept 100% sponsored VIP treatment 💕
            </span>
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={signatureText}
              onChange={(e) => onUpdateSignature(e.target.value)}
              placeholder="Sign your name or initials..."
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-serif text-slate-900 italic focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
            <button
              type="button"
              onClick={() => {
                soundFX.playChime();
                onUpdateSignature(sweetheartName || 'Sweetheart ❤️');
                onToggleContractSigned(true);
              }}
              className="whitespace-nowrap px-3 py-1.5 text-xs font-semibold bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl transition-colors cursor-pointer"
            >
              Auto-Sign ✍️
            </button>
          </div>
        </div>
      </div>

      {/* Final Action Button: Grant Date & Issue Receipt */}
      <div className="pt-1">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={() => {
            soundFX.playStamp();
            onNext();
          }}
          className={`w-full py-3.5 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isFormValid
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-500/25 active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Approve &amp; Grant Official Date Receipt</span>
          <span>🎉</span>
        </button>
      </div>

      {/* Contract Terms POPUP MODAL */}
      <ContractTermsModal
        isOpen={isTermsModalOpen}
        sweetheartName={sweetheartName}
        admirerName={admirerName}
        paymentMethod={paymentMethod}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};
