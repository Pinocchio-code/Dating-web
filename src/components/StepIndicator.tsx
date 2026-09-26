import React from 'react';
import { Calendar, MapPin, Utensils, CreditCard, Award, ArrowLeft } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onGoToStep: (step: number) => void;
  onGoBack: () => void;
  maxAccessibleStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onGoToStep,
  onGoBack,
  maxAccessibleStep,
}) => {
  const steps = [
    { num: 1, label: 'Date & Time', icon: Calendar },
    { num: 2, label: 'Place', icon: MapPin },
    { num: 3, label: 'What to Eat', icon: Utensils },
    { num: 4, label: 'Payment Contract', icon: CreditCard },
    { num: 5, label: 'Approved Receipt', icon: Award },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-3 pb-2">
      {/* Top back & progress breadcrumb */}
      <div className="flex items-center justify-between mb-4">
        {currentStep > 1 && currentStep < 5 ? (
          <button
            type="button"
            onClick={onGoBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-500" />
            <span>Previous Step</span>
          </button>
        ) : (
          <span className="text-xs font-medium text-rose-600">
            {currentStep === 5 ? "🎉 Dating Officially Granted" : "💕 Date Planning Suite"}
          </span>
        )}

        <div className="text-xs font-medium text-slate-500">
          Step <span className="font-semibold text-slate-900">{currentStep}</span> of 5
        </div>
      </div>

      {/* Progress Bars / Clean Step Indicators */}
      <div className="grid grid-cols-5 gap-1.5 md:gap-3">
        {steps.map((s) => {
          const isCurrent = s.num === currentStep;
          const isDone = s.num < currentStep;
          const isClickable = s.num <= maxAccessibleStep && s.num !== currentStep;

          return (
            <button
              key={s.num}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onGoToStep(s.num)}
              className={`flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl transition-all text-center ${
                isClickable ? 'cursor-pointer hover:bg-rose-50/70' : 'cursor-default'
              } ${isCurrent ? 'bg-white shadow-xs border border-rose-200' : 'bg-transparent'}`}
            >
              <div
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-300'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? '✓' : s.num}
              </div>
              <span
                className={`text-[11px] md:text-xs font-medium line-clamp-1 leading-tight ${
                  isCurrent ? 'text-rose-600 font-semibold' : isDone ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
