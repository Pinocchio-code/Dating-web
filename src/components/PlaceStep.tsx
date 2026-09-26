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
  Search, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
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

  const canContinue = Boolean(selectedSpecificPlace);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
          Where Are We Going, {sweetheartName || 'Sweetheart'}? 📍
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Select a category from the box below to explore romantic spots!
        </p>
      </div>

      {/* Single Category Selection Box */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-200">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
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
              // Reset specific place or set default first item of new category
              const nextDef = PLACE_CATEGORIES.find((c) => c.id === newCat);
              if (nextDef && nextDef.places.length > 0) {
                onSelectSpecificPlace(nextDef.places[0].name);
              }
            }}
            className="w-full appearance-none pl-11 pr-10 py-3.5 bg-rose-50/50 hover:bg-rose-50 border-2 border-rose-300 rounded-xl text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer transition-colors"
          >
            {PLACE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id} className="py-2 text-slate-900">
                {cat.title}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{currentCategoryDef.tagline}</span>
          </div>
        </div>
      </div>

      {/* Selectable Places List under chosen Category */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Choose Your Destination:</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your favorite spot below
            </p>
          </div>

          {/* Quick Search inside the category */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spot in Addis..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Selected Place Badge */}
        {selectedSpecificPlace && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                  Selected Destination:
                </span>
                <span className="text-slate-900 font-bold text-sm">
                  {selectedSpecificPlace}
                </span>
              </div>
            </div>
            <span className="text-rose-600 font-semibold text-[11px] hidden sm:inline">
              Ready for Date ✨
            </span>
          </div>
        )}

        {/* List of 10+ Places in Ethiopia */}
        <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
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
                className={`p-3.5 rounded-xl text-left border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-500 shadow-xs ring-2 ring-rose-400/40'
                    : 'bg-slate-50/60 hover:bg-slate-50 border-slate-200 hover:border-rose-200 text-slate-800'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {place.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-medium">
                      {place.vibe}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>{place.location}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-1.5">
                    ✨ <strong className="text-slate-700">Highlight:</strong> {place.highlight}
                  </p>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'border border-slate-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            );
          })}

          {filteredPlaces.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-400">
              No spots matching &ldquo;{searchQuery}&rdquo;. Try another keyword!
            </div>
          )}
        </div>
      </div>

      {/* Specific Venue Note or Table Request */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-100">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Special Table / Spot preference at {selectedSpecificPlace || 'your chosen venue'}: (Optional)
        </label>
        <input
          type="text"
          value={placeSpecificNote}
          onChange={(e) => onUpdateSpecificNote(e.target.value)}
          placeholder="e.g. Outdoor garden table, sunset view booth, lakeside cabana..."
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
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
          <span>Next: Pick What to Eat</span>
          <span>👉</span>
        </button>
      </div>
    </div>
  );
};
