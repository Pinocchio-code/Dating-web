import React, { useMemo } from 'react';
import { Calendar, Clock, Sparkles, Sun, Moon, Coffee, UtensilsCrossed } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface DateTimeStepProps {
  selectedDate: string;
  selectedTimeSlot: string;
  customTime: string;
  onSelectDate: (date: string) => void;
  onSelectTimeSlot: (slot: string) => void;
  onUpdateCustomTime: (time: string) => void;
  onNext: () => void;
  sweetheartName: string;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  selectedDate,
  selectedTimeSlot,
  customTime,
  onSelectDate,
  onSelectTimeSlot,
  onUpdateCustomTime,
  onNext,
  sweetheartName,
}) => {
  // Generate quick upcoming dates
  const quickDates = useMemo(() => {
    const today = new Date();
    const options: { label: string; dateStr: string; dayName: string }[] = [];

    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 is Sun, 5 is Fri, 6 is Sat
      const isoStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      if (dayOfWeek === 5) {
        options.push({ label: 'This Friday Night', dateStr: isoStr, dayName });
      } else if (dayOfWeek === 6) {
        options.push({ label: 'This Saturday', dateStr: isoStr, dayName });
      } else if (dayOfWeek === 0) {
        options.push({ label: 'Sunday Afternoon', dateStr: isoStr, dayName });
      }
    }

    // Add tomorrow as well if not already added
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowIso = tomorrow.toISOString().split('T')[0];
    if (!options.some((o) => o.dateStr === tomorrowIso)) {
      options.unshift({
        label: 'Tomorrow',
        dateStr: tomorrowIso,
        dayName: tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    }

    return options.slice(0, 4);
  }, []);

  const timeSlots = [
    {
      id: '09:30 AM',
      title: 'Morning Breakfast & Coffee',
      desc: 'Fresh morning breeze, hot cappuccino & warm pastries',
      icon: Coffee,
      vibe: 'Refreshing & Sweet',
    },
    {
      id: '01:00 PM',
      title: 'Lunch & Leisurely Walk',
      desc: 'Sunny afternoon meal and peaceful strolling',
      icon: Sun,
      vibe: 'Casual & Relaxing',
    },
    {
      id: '04:00 PM',
      title: 'Afternoon Tea & Treats',
      desc: 'Cakes, mocktails, and cozy conversation',
      icon: UtensilsCrossed,
      vibe: 'Cozy & Charming',
    },
    {
      id: '06:00 PM',
      title: 'Golden Hour Sunset Date',
      desc: 'Warm sunset lighting, perfect for photos & memories',
      icon: Sparkles,
      vibe: 'Golden & Dreamy',
    },
    {
      id: '07:30 PM',
      title: 'Romantic Candlelight Dinner',
      desc: 'Ambient lighting, soft background tunes & gourmet dining',
      icon: Moon,
      vibe: 'Intimate & Classic',
    },
    {
      id: 'custom',
      title: 'Custom Preferred Time',
      desc: 'Pick your exact dream hour',
      icon: Clock,
      vibe: 'Your Choice',
    },
  ];

  const todayIso = new Date().toISOString().split('T')[0];

  const canContinue = Boolean(selectedDate && (selectedTimeSlot !== 'custom' ? selectedTimeSlot : customTime));

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
          When Are We Going, {sweetheartName || 'Sweetheart'}? 📅
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Pick your ideal day and time for our special date.
        </p>
      </div>

      {/* Part 1: Date Selection */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-100">
        <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-sm">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span>1. Choose a Date</span>
        </div>

        {/* Quick Date Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {quickDates.map((qd) => {
            const isSelected = selectedDate === qd.dateStr;
            return (
              <button
                key={qd.dateStr}
                type="button"
                onClick={() => {
                  soundFX.playChime();
                  onSelectDate(qd.dateStr);
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : 'bg-slate-50 hover:bg-rose-50/50 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {qd.label}
                </div>
                <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                  {qd.dayName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Calendar Date Input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-rose-50/40 rounded-xl border border-rose-100">
          <span className="text-xs font-medium text-slate-700">Or select any calendar date:</span>
          <input
            type="date"
            min={todayIso}
            value={selectedDate}
            onChange={(e) => onSelectDate(e.target.value)}
            className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
      </div>

      {/* Part 2: Time Selection */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-100">
        <div className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-sm">
          <Clock className="w-4 h-4 text-rose-500" />
          <span>2. Choose Date Time & Vibe</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {timeSlots.map((slot) => {
            const isSelected = selectedTimeSlot === slot.id;
            const Icon = slot.icon;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => {
                  soundFX.playChime();
                  onSelectTimeSlot(slot.id);
                }}
                className={`p-3.5 rounded-xl text-left border flex items-start gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50 border-rose-400 shadow-xs ring-1 ring-rose-400'
                    : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-rose-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{slot.title}</span>
                    {slot.id !== 'custom' && (
                      <span className="text-[10px] text-rose-600 font-mono font-medium">
                        ({slot.id})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{slot.desc}</p>
                  <span className="inline-block text-[10px] text-rose-600/90 font-medium mt-1">
                    ✨ {slot.vibe}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom time picker if selected */}
        {selectedTimeSlot === 'custom' && (
          <div className="mt-4 p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">Enter custom time:</span>
            <input
              type="time"
              value={customTime}
              onChange={(e) => onUpdateCustomTime(e.target.value)}
              className="px-3 py-1.5 bg-white border border-rose-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
        )}
      </div>

      {/* Next Step Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => {
            soundFX.playChime();
            onNext();
          }}
          className={`w-full py-4 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
            canContinue
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-500/25 active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Next: Pick Destination Place</span>
          <span>👉</span>
        </button>
      </div>
    </div>
  );
};
