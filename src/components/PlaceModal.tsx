import React, { useState, useMemo } from 'react';
import { DatePlaceType } from '../types';
import { PLACE_CATEGORIES } from '../data/dateOptions';
import { 
  X, 
  MapPin, 
  Search, 
  Check, 
  Sparkles, 
  ChevronDown,
  Trees,
  ShoppingBag,
  UtensilsCrossed,
  Building2,
  Gamepad2
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface PlaceModalProps {
  isOpen: boolean;
  selectedCategory: DatePlaceType;
  selectedSpecificPlace: string;
  onSelectCategory: (category: DatePlaceType) => void;
  onSelectSpecificPlace: (placeName: string) => void;
  onClose: () => void;
}

export const PlaceModal: React.FC<PlaceModalProps> = ({
  isOpen,
  selectedCategory,
  selectedSpecificPlace,
  onSelectCategory,
  onSelectSpecificPlace,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategoryDef = useMemo(() => {
    return PLACE_CATEGORIES.find((c) => c.id === selectedCategory) || PLACE_CATEGORIES[0];
  }, [selectedCategory]);

  const filteredPlaces = useMemo(() => {
    if (!searchQuery.trim()) return currentCategoryDef.places;
    const query = searchQuery.toLowerCase();
    return currentCategoryDef.places.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.vibe.toLowerCase().includes(query)
    );
  }, [currentCategoryDef, searchQuery]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 flex flex-col max-h-[88vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-tight">
                Choose Destination
              </h3>
              <p className="text-[11px] text-slate-500">
                Browse and select your favorite romantic spot
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

        {/* Category Dropdown and Search */}
        <div className="p-3 sm:p-4 border-b border-slate-100 bg-white space-y-2.5">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none">
              <SelectedIcon className="w-4 h-4" />
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
              className="w-full appearance-none pl-9 pr-8 py-2.5 bg-rose-50/60 border border-rose-200 rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
            >
              {PLACE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spots in Ethiopia..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Scrollable Places List inside Modal */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2 flex-1 max-h-[50vh]">
          {filteredPlaces.map((place) => {
            const isSelected = selectedSpecificPlace === place.name;

            return (
              <button
                key={place.id}
                type="button"
                onClick={() => {
                  soundFX.playChime();
                  onSelectSpecificPlace(place.name);
                }}
                className={`w-full p-3 rounded-xl text-left border transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-500 shadow-xs ring-1 ring-rose-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {place.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-100/70 text-rose-800 font-medium">
                      {place.vibe}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{place.location}</span>
                  </p>

                  <p className="text-[11px] text-slate-600 mt-1">
                    ✨ <strong className="text-slate-700">Highlight:</strong> {place.highlight}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'border border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </button>
            );
          })}

          {filteredPlaces.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              No spots matching &ldquo;{searchQuery}&rdquo;. Try another search!
            </div>
          )}
        </div>

        {/* Modal Footer Confirmation */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-600 truncate">
            Selected: <strong className="text-slate-900 font-semibold">{selectedSpecificPlace || 'None'}</strong>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-xs shadow-sm cursor-pointer active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Confirm Spot</span>
          </button>
        </div>
      </div>
    </div>
  );
};
