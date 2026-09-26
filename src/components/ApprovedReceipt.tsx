import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { DatePlanState } from '../types';
import { PLACE_CATEGORIES } from '../data/dateOptions';
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Utensils, 
  CreditCard, 
  Download, 
  Printer, 
  RotateCcw, 
  Heart, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { ReceiptModal } from './ReceiptModal';
import { soundFX } from '../utils/audio';

interface ApprovedReceiptProps {
  plan: DatePlanState;
  onRestart: () => void;
}

export const ApprovedReceipt: React.FC<ApprovedReceiptProps> = ({ plan, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Trigger celebratory confetti on mount
  useEffect(() => {
    soundFX.playStamp();
    
    const end = Date.now() + 1.8 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const placeCat = PLACE_CATEGORIES.find((c) => c.id === plan.placeType);
  const finalPlaceName = plan.selectedSpecificPlace || placeCat?.places[0]?.name || 'Addis Ababa Romance Spot';
  const finalDishes = plan.foodChoices.length > 0 ? plan.foodChoices : ['Special Shekla Tibs'];

  const formattedDate = plan.selectedDate
    ? new Date(plan.selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : 'Upcoming Special Date';

  const timeDisplay = plan.selectedTimeSlot === 'custom' ? plan.customTime : plan.selectedTimeSlot;

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Dream Date with ${plan.sweetheartName || 'Sweetheart'} ❤️`);
    const details = encodeURIComponent(
      `Date with ${plan.sweetheartName}!\nDestination: ${finalPlaceName} (${plan.placeSpecificNote || placeCat?.title})\nFood: ${finalDishes.join(', ')}\nPayment: 100% covered via ${plan.paymentMethod.toUpperCase()}`
    );
    const location = encodeURIComponent(finalPlaceName + (plan.placeSpecificNote ? ` - ${plan.placeSpecificNote}` : ''));
    
    const dateClean = plan.selectedDate ? plan.selectedDate.replace(/-/g, '') : '20261010';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateClean}T160000Z/${dateClean}T200000Z`;
  };

  // Download .ics file for Apple/Outlook/Google Calendar
  const handleDownloadICS = () => {
    const dateClean = plan.selectedDate ? plan.selectedDate.replace(/-/g, '') : '20261010';
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sweetheart Date Reservation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Dream Date with ${plan.sweetheartName || 'Sweetheart'} ❤️`,
      `DESCRIPTION:Date with ${plan.sweetheartName}! Destination: ${finalPlaceName}. Food: ${finalDishes.join(', ')}. Payment 100% covered via ${plan.paymentMethod.toUpperCase()}.`,
      `LOCATION:${finalPlaceName}`,
      `DTSTART:${dateClean}T160000Z`,
      `DTEND:${dateClean}T200000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `date-reservation-${plan.reservationId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy share message for WhatsApp / SMS
  const handleCopyShare = () => {
    const text = `🎉 IT'S OFFICIAL! OUR DATE HAS BEEN GRANTED & APPROVED! ❤️\n\n` +
      `📅 Date: ${formattedDate} (${timeDisplay})\n` +
      `📍 Place: ${finalPlaceName} [${placeCat?.title}] ${plan.placeSpecificNote ? `(${plan.placeSpecificNote})` : ''}\n` +
      `🍽️ Feast: ${finalDishes.join(', ')}\n` +
      `💳 Payment: 100% covered by ${plan.admirerName || 'Admirer'} via ${plan.paymentMethod.toUpperCase()}\n` +
      `💰 Sweetheart Cost: 0.00 ETB (Priceless)\n` +
      `📜 Reservation Code: #${plan.reservationId}\n\n` +
      `Can't wait to see your smile, sweetheart! 💕`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 space-y-4">
      {/* Top Banner */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold mb-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Application: APPROVED &bull; Couple Maber</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
          Dating Officially Granted! 🎉
        </h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Your reservation is approved &amp; sealed with 100% VIP treatment!
        </p>
      </div>

      {/* Sleek Compact Approved Card (Fits on screen without page scroll) */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-rose-200 text-slate-800 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400" />

        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                Reservation #{plan.reservationId}
              </span>
              <span className="border border-rose-600 text-rose-600 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase">
                APPROVED ❤️
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Sweetheart: <strong className="text-slate-700">{plan.sweetheartName || 'Sweetheart'}</strong> &bull; Sponsoring: <strong className="text-slate-700">{plan.admirerName || 'Admirer'}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFX.playChime();
              setIsReceiptModalOpen(true);
            }}
            className="py-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-rose-500" />
            <span>View Full Permit (Popup)</span>
          </button>
        </div>

        {/* Quick Compact Line items */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 font-medium block flex items-center gap-1">
              <Calendar className="w-3 h-3 text-rose-500" /> When:
            </span>
            <span className="font-bold text-slate-900 text-xs block truncate mt-0.5">
              {formattedDate}
            </span>
            <span className="text-[10px] text-slate-500 block truncate">{timeDisplay}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 font-medium block flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500" /> Where:
            </span>
            <span className="font-bold text-slate-900 text-xs block truncate mt-0.5">
              {finalPlaceName}
            </span>
            <span className="text-[10px] text-slate-500 block truncate">{placeCat?.title}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 font-medium block flex items-center gap-1">
              <Utensils className="w-3 h-3 text-rose-500" /> Feasts:
            </span>
            <span className="font-bold text-slate-900 text-xs block truncate mt-0.5">
              {finalDishes.join(', ')}
            </span>
            <span className="text-[10px] text-slate-500 block truncate">
              {finalDishes.length} items ordered
            </span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 font-medium block flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-rose-500" /> Total Due:
            </span>
            <span className="font-bold text-emerald-600 text-xs block mt-0.5">
              0.00 ETB (Free!)
            </span>
            <span className="text-[10px] text-slate-500 uppercase block truncate">
              {plan.paymentMethod} Sponsor
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-dashed border-slate-200 text-xs">
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Guaranteed with Love &bull; Couple Maber</span>
          </div>
          <span className="font-serif italic font-bold text-rose-600 text-xs">
            {plan.signatureText || 'Signed'} ✍️
          </span>
        </div>
      </div>

      {/* Action Buttons for Mobile & Desktop (compact grid) */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopyShare}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-rose-500" />
                <span className="truncate">Copy WhatsApp</span>
              </>
            )}
          </button>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-2xs flex items-center justify-center gap-1.5 transition-colors text-center"
          >
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span className="truncate">Add to Calendar</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDownloadICS}
            className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 font-semibold text-xs border border-rose-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-rose-600" />
            <span className="truncate">Save .ICS</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span className="truncate">Print / PDF</span>
          </button>
        </div>

        {/* Restart / Edit Date button */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-600 transition-colors py-1 px-2.5 rounded-lg hover:bg-rose-50 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Plan Another Date or Modify Choices</span>
          </button>
        </div>
      </div>

      {/* FULL CERTIFICATE POPUP MODAL */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        plan={plan}
        onClose={() => setIsReceiptModalOpen(false)}
        onPrint={handlePrint}
      />
    </div>
  );
};
