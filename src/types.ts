export type DatePlaceType = 'park' | 'mall' | 'restaurants' | 'hotel' | 'gaming mall';

export type PaymentMethod = 'telebirr' | 'cbe';

export interface EthiopianPlaceItem {
  id: string;
  name: string;
  location: string;
  vibe: string;
  highlight: string;
}

export interface PlaceCategoryDef {
  id: DatePlaceType;
  title: string;
  tagline: string;
  icon: string;
  places: EthiopianPlaceItem[];
}

export interface EthiopianFoodItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tag: string;
}

export interface FoodCategoryDef {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: EthiopianFoodItem[];
}

export interface DatePlanState {
  sweetheartName: string;
  admirerName: string;
  confirmedYes: boolean;
  
  // Date & Time
  selectedDate: string;
  selectedTimeSlot: string;
  customTime: string;
  
  // Place
  placeType: DatePlaceType;
  selectedSpecificPlace: string;
  placeSpecificNote: string;
  
  // Food
  foodCategory: string;
  foodChoices: string[];
  foodSpecialRequest: string;
  
  // Payment
  paymentMethod: PaymentMethod;
  contractSigned: boolean;
  signatureText: string;
  
  // Meta
  reservationId: string;
  createdAt: string;
}
