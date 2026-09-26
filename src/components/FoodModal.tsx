import React, { useState, useMemo } from 'react';
import { FOOD_CATEGORIES } from '../data/dateOptions';
import { 
  X, 
  Utensils, 
  Search, 
  Check, 
  Sparkles, 
  ChevronDown,
  Flame,
  Pizza,
  Beef,
  Soup,
  Coffee
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface FoodModalProps {
  isOpen: boolean;
  selectedCategory: string;
  selectedFoods: string[];
  onSelectCategory: (category: string) => void;
  onToggleFood: (foodName: string) => void;
  onClose: () => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  isOpen,
  selectedCategory,
  selectedFoods,
  onSelectCategory,
  onToggleFood,
  onClose,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 flex flex-col max-h-[88vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-tight">
                Select Date Feasts
              </h3>
              <p className="text-[11px] text-slate-500">
                Pick 1 or multiple delicious cravings for date night
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
                const newCat = e.target.value;
                onSelectCategory(newCat);
                soundFX.playChime();
              }}
              className="w-full appearance-none pl-9 pr-8 py-2.5 bg-rose-50/60 border border-rose-200 rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer"
            >
              {FOOD_CATEGORIES.map((cat) => (
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
              placeholder="Search dishes or ingredients..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>
        </div>

        {/* Scrollable Food List inside Modal */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2 flex-1 max-h-[50vh]">
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
                className={`w-full p-3 rounded-xl text-left border transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-50/90 border-rose-500 shadow-xs ring-1 ring-rose-400/40'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {food.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-100/70 text-rose-800 font-medium">
                      {food.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {food.description}
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

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              No dishes matching &ldquo;{searchQuery}&rdquo;. Try another search!
            </div>
          )}
        </div>

        {/* Modal Footer Confirmation */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-600 truncate">
            Selected:{' '}
            <strong className="text-slate-900 font-semibold">
              {selectedFoods.length > 0 ? `${selectedFoods.length} dishes` : 'None'}
            </strong>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-xs shadow-sm cursor-pointer active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Done Selecting ({selectedFoods.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
