import React, { useState, useMemo } from 'react';
import { FOOD_CATEGORIES } from '../data/dateOptions';
import { 
  Flame, 
  Pizza, 
  Beef, 
  Soup, 
  Utensils, 
  Coffee, 
  Check, 
  Heart, 
  Sparkles, 
  Search, 
  ChevronDown 
} from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategoryDef = useMemo(() => {
    return FOOD_CATEGORIES.find((c) => c.id === selectedCategory) || FOOD_CATEGORIES[0];
  }, [selectedCategory]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return currentCategoryDef.items;
    const query = searchQuery.toLowerCase();
    return currentCategoryDef.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query)
    );
  }, [currentCategoryDef, searchQuery]);

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
    <div className="w-full max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
          What Are We Feasting On, {sweetheartName || 'Sweetheart'}? 🍽️
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Choose a cuisine category from the box below, then select your favorite dishes!
        </p>
      </div>

      {/* Single Category Selection Box */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-200">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Select Food Category:
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
            className="w-full appearance-none pl-11 pr-10 py-3.5 bg-rose-50/50 hover:bg-rose-50 border-2 border-rose-300 rounded-xl text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer transition-colors"
          >
            {FOOD_CATEGORIES.map((cat) => (
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
            <span>{currentCategoryDef.description}</span>
          </div>
        </div>
      </div>

      {/* Selectable Food Items under Chosen Category */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-rose-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
              <Utensils className="w-4 h-4 text-rose-500" />
              <span>Select Dishes (Pick 1 or Multiple):</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap any dish to add or remove it from our date feast
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dish or ingredient..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Selected Dishes Summary Counter */}
        {selectedFoods.length > 0 && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                {selectedFoods.length}
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                  Dishes Picked for Date:
                </span>
                <span className="text-slate-900 font-bold text-xs line-clamp-1">
                  {selectedFoods.join(', ')}
                </span>
              </div>
            </div>
            <span className="text-rose-600 font-semibold text-[11px] whitespace-nowrap">
              Feast Ready 😋
            </span>
          </div>
        )}

        {/* List of 10+ Food Items */}
        <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {filteredItems.map((food) => {
            const isSelected = selectedFoods.includes(food.name);

            return (
              <button
                key={food.id}
                type="button"
                onClick={() => {
                  soundFX.playChime();
                  onToggleFood(food.name);
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
                      {food.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-medium">
                      {food.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {food.description}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Category: {food.category}
                  </span>
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

          {filteredItems.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-400">
              No dishes matching &ldquo;{searchQuery}&rdquo;. Try another craving!
            </div>
          )}
        </div>
      </div>

      {/* Special Requests or Dietary Notes */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-rose-100">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Special cravings or instructions: (Optional)</span>
        </label>
        <textarea
          rows={2}
          value={foodSpecialRequest}
          onChange={(e) => onUpdateSpecialRequest(e.target.value)}
          placeholder="e.g. Extra spicy awaze, well-done, lots of melted cheese, extra dessert..."
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
        />
      </div>

      {/* Next Step Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!hasSelection}
          onClick={() => {
            soundFX.playChime();
            onNext();
          }}
          className={`w-full py-4 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
            hasSelection
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-500/25 active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Next: Pick Payment Contract (Telebirr / CBE)</span>
          <span>👉</span>
        </button>
      </div>
    </div>
  );
};
