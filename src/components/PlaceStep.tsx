import React, { useState, useMemo } from 'react';
import { DatePlaceType } from '../types';
import { PLACE_CATEGORIES } from '../data/dateOptions';
import { 
  Trees, 
  ShoppingBag, 
  UtensilsCrossed, 
  Building2, 
  Gamepad2, 
  Check, 
  MapPin, 
  Sparkles,
  ChevronDown,
  Layers
} from 'lucide-react';
import { PlaceModal } from './PlaceModal';
import { soundFX } from '../utils/audio';

interface PlaceStepProps {
  selectedCategory: DatePlaceType;
  selectedSpecificPlace: string;
  placeSpecificNote: string;
  onSelectCategory: (category: DatePlaceType) => void;
  onSelectSpecificPlace: (placeName: string) => void;
  onUpdateSpecificNote: (note: string) => void;
  onNext: () => void;
  sweetheartName: string;
}

export const PlaceStep: React.FC<PlaceStepProps> = ({
  selectedCategory,
  selectedSpecificPlace,
  placeSpecificNote,
  onSelectCategory,
  onSelectSpecificPlace,
  onUpdateSpecificNote,
  onNext,
  sweetheartName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCategoryDef = useMemo(() => {
    return PLACE_CATEGORIES.find((c) => c.id === selectedCategory) || PLACE_CATEGORIES[0];
  }, [selectedCategory]);

  const currentPlaceObj = useMemo(() => {
    return (
      currentCategoryDef.places.find((p) => p.name === selectedSpecificPlace) ||
      currentCategoryDef.places[0]
    );
  }, [currentCategoryDef, selectedSpecificPlace]);

  const getCategoryIcon = (id: DatePlaceType) => {
    switch (id) {
      case 'park':
        return Trees;
      case 'mall':
        return ShoppingBag;
      case 'restaurants':
        return UtensilsCrossed;
      case 'hotel':
        return Building2;
      case 'gaming mall':
        return Gamepad2;
      default:
        return Trees;
    }
  };

  const SelectedIcon = getCategoryIcon(selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
          Where Are We Going, {sweetheartName || 'Sweetheart'}? 📍
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Select a category and choose your favorite date spot in the popup!
        </p>
      </div>

      {/* Single Category Selection Box */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-200">
        <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
          Select Place Category:
        </label>

        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none">
            <SelectedIcon className="w-5 h-5" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              const newCat = e.target.value as DatePlaceType;
              onSelectCategory(newCat);
              soundFX.playChime();
              const nextDef = PLACE_CATEGORIES.find((c) => c.id === newCat);
              if (nextDef && nextDef.places.length > 0) {
                onSelectSpecificPlace(nextDef.places[0].name);
              }
            }}
            className="w-full appearance-none pl-11 pr-10 py-3 bg-rose-50/50 hover:bg-rose-50 border-2 border-rose-300 rounded-xl text-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer transition-colors"
          >
            {PLACE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate">{currentCategoryDef.tagline}</span>
        </div>
      </div>

      {/* Active Selected Destination Preview Card + Popup Trigger Button */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Chosen Destination:
          </span>
          <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
            {currentCategoryDef.title} Spot
          </span>
        </div>

        <div className="p-3.5 bg-gradient-to-br from-rose-50/80 to-pink-50/50 rounded-xl border border-rose-200/90 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg">
                {currentPlaceObj?.name || selectedSpecificPlace}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{currentPlaceObj?.location}</span>
              </p>
            </div>
            <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div className="pt-2 border-t border-rose-200/60 text-xs text-slate-700">
            <span className="font-semibold text-slate-900">✨ Highlight: </span>
            <span>{currentPlaceObj?.highlight}</span>
          </div>
        </div>

        {/* The POPUP trigger button */}
        <button
          type="button"
          onClick={() => {
            soundFX.playChime();
            setIsModalOpen(true);
          }}
          className="mt-3 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Layers className="w-3.5 h-3.5 text-rose-400" />
          <span>Browse All Spots in Popup (10+ Locations)</span>
        </button>
      </div>

      {/* Special Venue Note input */}
      <div className="bg-white rounded-2xl p-3 shadow-xs border border-rose-100">
        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
          Special Table / Spot preference: (Optional)
        </label>
        <input
          type="text"
          value={placeSpecificNote}
          onChange={(e) => onUpdateSpecificNote(e.target.value)}
          placeholder="e.g. Outdoor garden table, sunset view booth..."
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-400"
        />
      </div>

      {/* Next Step Button (fits on screen without scrolling) */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => {
            soundFX.playChime();
            onNext();
          }}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm shadow-md bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next: Pick What to Eat</span>
          <span>👉</span>
        </button>
      </div>

      {/* POPUP MODAL for selecting places */}
      <PlaceModal
        isOpen={isModalOpen}
        selectedCategory={selectedCategory}
        selectedSpecificPlace={selectedSpecificPlace}
        onSelectCategory={onSelectCategory}
        onSelectSpecificPlace={onSelectSpecificPlace}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
