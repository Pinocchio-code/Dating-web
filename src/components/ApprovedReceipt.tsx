import React, { useEffect, useState, useRef } from 'react';
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
  Sparkles, 
  QrCode,
  Copy,
  Check
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ApprovedReceiptProps {
  plan: DatePlanState;
  onRestart: () => void;
}

export const ApprovedReceipt: React.FC<ApprovedReceiptProps> = ({ plan, onRestart }) => {
  const [copied, setCopied] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // Trigger celebratory confetti on mount
  useEffect(() => {
    soundFX.playStamp();
    
    const end = Date.now() + 2 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
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
      `📍 Place in Ethiopia: ${finalPlaceName} [${placeCat?.title}] ${plan.placeSpecificNote ? `(${plan.placeSpecificNote})` : ''}\n` +
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
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Top Banner */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Application Form: APPROVED</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
          Dating Officially Granted! 🎉
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
          Here is your approved, legally binding date reservation receipt. Keep this safe as proof of 100% VIP treatment!
        </p>
      </div>

      {/* The Printable Official Receipt */}
      <div
        ref={receiptRef}
        className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-rose-200 text-slate-800 overflow-hidden print:shadow-none print:border-none"
      >
        {/* Decorative Top Serrated edge simulation */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400" />

        {/* Big Official Rubber Stamp Overlay */}
        <div className="absolute right-4 top-16 md:right-8 md:top-14 pointer-events-none z-20">
          <div className="animate-stamp border-4 border-rose-600 text-rose-600 rounded-xl px-3 py-1.5 font-serif font-black text-xs md:text-sm tracking-wider uppercase opacity-90 shadow-xs flex items-center gap-1.5 backdrop-blur-xs bg-white/40">
            <Heart className="w-4 h-4 fill-rose-600" />
            <span>APPROVED &amp; GRANTED</span>
          </div>
        </div>

        {/* Receipt Header */}
        <div className="border-b border-slate-200 pb-4 mb-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-lg font-serif font-bold text-slate-900">
                Sweetheart Date Certificate
              </span>
              <Sparkles className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ethiopian Ministry of Romance &bull; Powered by Couple Maber
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono text-center sm:text-right">
            <div>
              ID: <span className="font-bold text-slate-900">#{plan.reservationId}</span>
            </div>
            <div>Issued: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Participants */}
        <div className="grid grid-cols-2 gap-3 p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100 mb-5 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Honored Sweetheart:</span>
            <span className="font-bold text-slate-900 text-sm">
              {plan.sweetheartName || 'My Sweetheart'} 🥰
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Sponsoring Admirer:</span>
            <span className="font-bold text-slate-900 text-sm">
              {plan.admirerName || 'Your Admirer'} ❤️
            </span>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-3.5 mb-6 text-xs">
          {/* Date & Time */}
          <div className="flex items-start justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Date &amp; Time</span>
                <p className="text-[11px] text-slate-500">{timeDisplay}</p>
              </div>
            </div>
            <span className="font-bold text-slate-900 text-right">{formattedDate}</span>
          </div>

          {/* Destination */}
          <div className="flex items-start justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Destination (Ethiopia)</span>
                <p className="text-[11px] text-slate-500">{placeCat?.title} Category</p>
              </div>
            </div>
            <div className="text-right max-w-[200px]">
              <span className="font-bold text-slate-900 block truncate">
                {finalPlaceName}
              </span>
              {plan.placeSpecificNote && (
                <span className="text-[10px] text-slate-500 italic block">
                  Note: {plan.placeSpecificNote}
                </span>
              )}
            </div>
          </div>

          {/* Food Feasts */}
          <div className="flex items-start justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Selected Feasts</span>
                <p className="text-[11px] text-slate-500">
                  {plan.foodSpecialRequest || 'Delicacies chosen with love'}
                </p>
              </div>
            </div>
            <span className="font-medium text-slate-900 text-right max-w-[220px]">
              {finalDishes.join(', ')}
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex items-start justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Payment Channel</span>
                <p className="text-[11px] text-slate-500">
                  Contract signed by {plan.sweetheartName || 'Sweetheart'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold uppercase text-slate-900">
                {plan.paymentMethod === 'telebirr' ? 'Telebirr Mobile' : 'CBE (Commercial Bank)'}
              </span>
              <span className="block text-[10px] text-emerald-600 font-semibold">
                &bull; 100% Pre-funded
              </span>
            </div>
          </div>
        </div>

        {/* Totals & Pricing Breakdown */}
        <div className="p-4 bg-slate-50 rounded-2xl space-y-1.5 text-xs mb-5">
          <div className="flex justify-between text-slate-600">
            <span>Date Expenses (Food, Venue, Transport):</span>
            <span className="line-through text-slate-400">2,500.00 ETB</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Admirer Love Discount:</span>
            <span className="text-rose-600">-100%</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold">
            <span className="text-slate-900">Sweetheart Total Due:</span>
            <div className="text-right">
              <span className="text-emerald-600 text-base">0.00 ETB</span>
              <span className="block text-[10px] text-slate-500 font-normal">
                (Payment required in smiles &amp; hugs)
              </span>
            </div>
          </div>
        </div>

        {/* Signature & Seal */}
        <div className="flex items-center justify-between pt-3 border-t border-dashed border-slate-300">
          <div className="flex items-center gap-2">
            <QrCode className="w-10 h-10 text-slate-700" />
            <div className="text-[10px] text-slate-500 leading-tight">
              <span>SCAN TO REDEEM:</span>
              <br />
              <strong className="text-slate-800">UNCONDITIONAL LOVE</strong>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
              Authorization Signature
            </span>
            <span className="font-serif italic font-bold text-rose-600 text-sm">
              {plan.signatureText || plan.sweetheartName || 'Sweetheart Sealed'} ✍️
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons for Mobile & Desktop */}
      <div className="space-y-3">
        {/* Share & Copy Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleCopyShare}
            className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600 font-bold">Details Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-rose-500" />
                <span>Copy Summary for Sweetheart / WhatsApp</span>
              </>
            )}
          </button>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-colors text-center"
          >
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>Add to Google Calendar</span>
          </a>
        </div>

        {/* Download & Print Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDownloadICS}
            className="py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 font-semibold text-xs border border-rose-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-rose-600" />
            <span>Download Apple / Phone Calendar (.ics)</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* Restart / Edit Date button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors py-2 px-3 rounded-lg hover:bg-rose-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Plan Another Date or Modify Choices</span>
          </button>
        </div>
      </div>
    </div>
  );
};
