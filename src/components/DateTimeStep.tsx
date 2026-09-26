import React, { useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
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
      const dayOfWeek = d.getDay();
      const isoStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      if (dayOfWeek === 5) {
        options.push({ label: 'This Friday', dateStr: isoStr, dayName });
      } else if (dayOfWeek === 6) {
        options.push({ label: 'This Saturday', dateStr: isoStr, dayName });
      } else if (dayOfWeek === 0) {
        options.push({ label: 'Sunday Afternoon', dateStr: isoStr, dayName });
      }
    }

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
    { id: '09:30 AM', title: '09:30 AM - Morning Breakfast & Coffee' },
    { id: '01:00 PM', title: '01:00 PM - Lunch & Leisurely Walk' },
    { id: '04:00 PM', title: '04:00 PM - Afternoon Tea & Treats' },
    { id: '06:00 PM', title: '06:00 PM - Golden Hour Sunset Date' },
    { id: '07:30 PM', title: '07:30 PM - Romantic Candlelight Dinner' },
    { id: 'custom', title: 'Custom Time (Pick Below)' },
  ];

  const todayIso = new Date().toISOString().split('T')[0];
  const canContinue = Boolean(selectedDate && (selectedTimeSlot !== 'custom' ? selectedTimeSlot : customTime));

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
          When Are We Going, {sweetheartName || 'Sweetheart'}? 📅
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Pick your ideal day and time for our special date.
        </p>
      </div>

      {/* Part 1: Date Selection */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-200">
        <div className="flex items-center justify-between mb-2 text-slate-900 font-semibold text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>1. Choose a Date:</span>
          </div>
          {selectedDate && (
            <span className="text-rose-600 font-bold text-[11px]">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
            </span>
          )}
        </div>

        {/* Quick Date Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
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
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-slate-50 hover:bg-rose-50/50 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {qd.label}
                </div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                  {qd.dayName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Calendar Date Input */}
        <div className="flex items-center justify-between gap-2 p-2.5 bg-rose-50/40 rounded-xl border border-rose-100">
          <span className="text-[11px] font-medium text-slate-700">Or pick custom date:</span>
          <input
            type="date"
            min={todayIso}
            value={selectedDate}
            onChange={(e) => onSelectDate(e.target.value)}
            className="px-2.5 py-1 bg-white border border-rose-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-400"
          />
        </div>
      </div>

      {/* Part 2: Time Selection */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-200">
        <div className="flex items-center gap-1.5 mb-2 text-slate-900 font-semibold text-xs">
          <Clock className="w-4 h-4 text-rose-500" />
          <span>2. Choose Time &amp; Vibe:</span>
        </div>

        <select
          value={selectedTimeSlot}
          onChange={(e) => {
            soundFX.playChime();
            onSelectTimeSlot(e.target.value);
          }}
          className="w-full px-3 py-2.5 bg-rose-50/60 border border-rose-200 rounded-xl text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
        >
          {timeSlots.map((ts) => (
            <option key={ts.id} value={ts.id}>
              {ts.title}
            </option>
          ))}
        </select>

        {/* Custom time picker if selected */}
        {selectedTimeSlot === 'custom' && (
          <div className="mt-2.5 p-2 bg-rose-50 rounded-xl border border-rose-200 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">Enter custom time:</span>
            <input
              type="time"
              value={customTime}
              onChange={(e) => onUpdateCustomTime(e.target.value)}
              className="px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
        )}
      </div>

      {/* Next Step Button (fits on screen without scrolling) */}
      <div className="pt-1">
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => {
            soundFX.playChime();
            onNext();
          }}
          className={`w-full py-3.5 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
