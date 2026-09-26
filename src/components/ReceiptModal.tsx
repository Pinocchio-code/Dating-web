import React from 'react';
import { DatePlanState } from '../types';
import { PLACE_CATEGORIES } from '../data/dateOptions';
import { 
  X, 
  Heart, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Utensils, 
  CreditCard, 
  QrCode, 
  Printer 
} from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  plan: DatePlanState;
  onClose: () => void;
  onPrint: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  plan,
  onClose,
  onPrint,
}) => {
  if (!isOpen) return null;

  const placeCat = PLACE_CATEGORIES.find((c) => c.id === plan.placeType);
  const finalPlaceName = plan.selectedSpecificPlace || placeCat?.places[0]?.name || 'Addis Ababa Romance Spot';
  const finalDishes = plan.foodChoices.length > 0 ? plan.foodChoices : ['Special Shekla Tibs'];

  const formattedDate = plan.selectedDate
    ? new Date(plan.selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Upcoming Special Date';

  const timeDisplay = plan.selectedTimeSlot === 'custom' ? plan.customTime : plan.selectedTimeSlot;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-slate-900 text-sm sm:text-base">
              Official Date Permit
            </span>
            <Sparkles className="w-4 h-4 text-rose-500" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              className="py-1 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white hover:bg-rose-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Body (scrolls inside modal if needed, not on the page) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* Rubber Stamp Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base">
                Sweetheart Date Certificate
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Ethiopian Ministry of Romance &bull; Powered by Couple Maber
              </p>
            </div>

            <div className="border-2 border-rose-600 text-rose-600 rounded-lg px-2.5 py-1 font-serif font-black text-xs uppercase tracking-wider flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-600" />
              <span>APPROVED</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-2.5 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Sweetheart:</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                {plan.sweetheartName || 'Sweetheart'} 🥰
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Admirer:</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                {plan.admirerName || 'Admirer'} ❤️
              </span>
            </div>
          </div>

          <div className="space-y-2 border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-500" /> Date &amp; Time:
              </span>
              <span className="font-bold text-slate-900">{formattedDate} ({timeDisplay})</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Destination:
              </span>
              <span className="font-bold text-slate-900 text-right">{finalPlaceName}</span>
            </div>

            <div className="flex items-start justify-between py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-rose-500" /> Feasts:
              </span>
              <span className="font-medium text-slate-900 text-right max-w-[200px]">
                {finalDishes.join(', ')}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-rose-500" /> Payment:
              </span>
              <span className="font-bold uppercase text-slate-900">
                {plan.paymentMethod} (100% Sponosored)
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <div className="flex justify-between text-slate-500">
              <span>Estimated Cost:</span>
              <span className="line-through">2,500.00 ETB</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-slate-900">
              <span>Sweetheart Total Due:</span>
              <span className="text-emerald-600">0.00 ETB</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-dashed border-slate-200">
            <div className="flex items-center gap-1.5">
              <QrCode className="w-8 h-8 text-slate-600" />
              <span className="text-[10px] text-slate-500">#{plan.reservationId}</span>
            </div>
            <span className="font-serif italic text-rose-600 font-bold">
              {plan.signatureText || 'Sweetheart Sealed'} ✍️
            </span>
          </div>
        </div>

        {/* Close Button */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Popup
          </button>
        </div>
      </div>
    </div>
  );
};
