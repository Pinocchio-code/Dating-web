import React, { useState, useMemo } from 'react';
import { FOOD_CATEGORIES } from '../data/dateOptions';
import { 
  Flame, 
  Pizza, 
  Beef, 
  Soup, 
  Utensils, 
  Coffee, 
  ChevronDown, 
  Layers,
  Heart
} from 'lucide-react';
import { FoodModal } from './FoodModal';
import { soundFX } from '../utils/audio';

interface FoodStepProps {
  selectedCategory: string;
  selectedFoods: string[];
  foodSpecialRequest: string;
  onSelectCategory: (category: string) => void;
  onToggleFood: (foodName: string) => void;
  onUpdateSpecialRequest: (request: string) => void;
  onNext: () => void;
  sweetheartName: string;
}

export const FoodStep: React.FC<FoodStepProps> = ({
  selectedCategory,
  selectedFoods,
  foodSpecialRequest,
  onSelectCategory,
  onToggleFood,
  onUpdateSpecialRequest,
  onNext,
  sweetheartName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentCategoryDef = useMemo(() => {
    return FOOD_CATEGORIES.find((c) => c.id === selectedCategory) || FOOD_CATEGORIES[0];
  }, [selectedCategory]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return Flame;
      case 'Pizza':
        return Pizza;
      case 'Beef':
        return Beef;
      case 'Soup':
        return Soup;
      case 'Coffee':
        return Coffee;
      default:
        return Utensils;
    }
  };

  const SelectedIcon = getCategoryIcon(currentCategoryDef.icon);

  const hasSelection = selectedFoods.length > 0;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 space-y-4">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
          What Are We Feasting On, {sweetheartName || 'Sweetheart'}? 🍽️
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Pick your cuisine category and select dishes via popup!
        </p>
      </div>

      {/* Single Category Selection Box */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-200">
        <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1.5">
          Select Cuisine Category:
        </label>

        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none">
            <SelectedIcon className="w-5 h-5" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => {
              const newCat = e.target.value;
              onSelectCategory(newCat);
              soundFX.playChime();
            }}
            className="w-full appearance-none pl-11 pr-10 py-3 bg-rose-50/50 hover:bg-rose-50 border-2 border-rose-300 rounded-xl text-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer transition-colors"
          >
            {FOOD_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-2.5 text-[11px] text-slate-500 truncate">
          <span>{currentCategoryDef.description}</span>
        </div>
      </div>

      {/* Active Selected Dishes Preview Card + Popup Trigger Button */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Selected Feasts:
          </span>
          <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
            {selectedFoods.length} Selected
          </span>
        </div>

        <div className="p-3.5 bg-gradient-to-br from-rose-50/80 to-pink-50/50 rounded-xl border border-rose-200/90 min-h-[70px] flex flex-col justify-center">
          {selectedFoods.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {selectedFoods.map((foodName) => (
                <span
                  key={foodName}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <span>✓</span>
                  <span>{foodName}</span>
                </span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic text-center py-2">
              No dishes picked yet. Click below to browse and select!
            </div>
          )}
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
          <span>Browse All Dishes in Popup (10+ Items)</span>
        </button>
      </div>

      {/* Special Request */}
      <div className="bg-white rounded-2xl p-3 shadow-xs border border-rose-100">
        <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
          <Heart className="w-3 h-3 text-rose-500" />
          <span>Special cravings or dietary notes: (Optional)</span>
        </label>
        <input
          type="text"
          value={foodSpecialRequest}
          onChange={(e) => onUpdateSpecialRequest(e.target.value)}
          placeholder="e.g. Extra spicy awaze, well-done, lots of melted cheese..."
          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-400"
        />
      </div>

      {/* Next Step Button (fits on screen without scrolling) */}
      <div className="pt-1">
        <button
          type="button"
          disabled={!hasSelection}
          onClick={() => {
            soundFX.playChime();
            onNext();
          }}
          className={`w-full py-3.5 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
            hasSelection
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-500/25 active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Next: Pick Payment Contract (Telebirr / CBE)</span>
          <span>👉</span>
        </button>
      </div>

      {/* POPUP MODAL for selecting food */}
      <FoodModal
        isOpen={isModalOpen}
        selectedCategory={selectedCategory}
        selectedFoods={selectedFoods}
        onSelectCategory={onSelectCategory}
        onToggleFood={onToggleFood}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
