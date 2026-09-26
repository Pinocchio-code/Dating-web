import { useState } from 'react';
import { RomanticBackground } from './components/RomanticBackground';
import { InitialProposal } from './components/InitialProposal';
import { ConfirmYesModal } from './components/ConfirmYesModal';
import { StepIndicator } from './components/StepIndicator';
import { DateTimeStep } from './components/DateTimeStep';
import { PlaceStep } from './components/PlaceStep';
import { FoodStep } from './components/FoodStep';
import { PaymentStep } from './components/PaymentStep';
import { ApprovedReceipt } from './components/ApprovedReceipt';
import { DatePlanState, DatePlaceType, PaymentMethod } from './types';
import { Heart } from 'lucide-react';

const INITIAL_PLAN: DatePlanState = {
  sweetheartName: 'My Sweetheart',
  admirerName: 'Your Admirer',
  confirmedYes: false,
  selectedDate: '',
  selectedTimeSlot: '07:30 PM',
  customTime: '',
  placeType: 'park',
  selectedSpecificPlace: 'Friendship Park',
  placeSpecificNote: '',
  foodCategory: 'ethiopian',
  foodChoices: ['Special Shekla Tibs'],
  foodSpecialRequest: '',
  paymentMethod: 'telebirr',
  contractSigned: true,
  signatureText: 'Sweetheart ❤️',
  reservationId: 'DATE-2026-XOXO',
  createdAt: new Date().toISOString(),
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Proposal, 1: Date/Time, 2: Place, 3: Food, 4: Payment, 5: Receipt
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [plan, setPlan] = useState<DatePlanState>(() => {
    // Generate random 4-digit code for reservation ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    return {
      ...INITIAL_PLAN,
      reservationId: `DATE-ET-${randomCode}`,
    };
  });
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<number>(1);

  // Triggered when YES button is clicked on the proposal
  const handleSayYes = () => {
    setIsConfirmModalOpen(true);
  };

  // Triggered when YES is confirmed in the popup modal
  const handleConfirmYesInModal = () => {
    setPlan((prev) => ({ ...prev, confirmedYes: true }));
    setIsConfirmModalOpen(false);
    setCurrentStep(1);
    setMaxAccessibleStep((prev) => Math.max(prev, 1));
  };

  const handleGoToStep = (step: number) => {
    if (step <= maxAccessibleStep) {
      setCurrentStep(step);
    }
  };

  const handleNextStep = (nextStep: number) => {
    setCurrentStep(nextStep);
    setMaxAccessibleStep((prev) => Math.max(prev, nextStep));
  };

  const handleRestart = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setPlan({
      ...INITIAL_PLAN,
      reservationId: `DATE-ET-${randomCode}`,
    });
    setCurrentStep(0);
    setMaxAccessibleStep(1);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F7] text-slate-900 flex flex-col justify-between relative selection:bg-rose-200 selection:text-rose-900">
      {/* Floating hearts background */}
      <RomanticBackground />

      {/* Top Bar Contract compliant with frontend-design: Single row, 3 zones */}
      <header className="relative z-30 border-b border-rose-100/80 bg-white/80 backdrop-blur-md px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleRestart();
          }}
          className="text-lg md:text-xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-1.5"
        >
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span>Sweetheart Date</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setCurrentStep(0)}
            className={`hover:text-rose-600 transition-colors cursor-pointer ${
              currentStep === 0 ? 'text-rose-600 underline underline-offset-4' : ''
            }`}
          >
            Proposal
          </button>
          <button
            type="button"
            onClick={() => plan.confirmedYes && handleGoToStep(1)}
            disabled={!plan.confirmedYes}
            className={`hover:text-rose-600 transition-colors cursor-pointer ${
              currentStep === 1 ? 'text-rose-600 underline underline-offset-4' : ''
            } ${!plan.confirmedYes ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Date &amp; Time
          </button>
          <button
            type="button"
            onClick={() => plan.confirmedYes && handleGoToStep(2)}
            disabled={!plan.confirmedYes || maxAccessibleStep < 2}
            className={`hover:text-rose-600 transition-colors cursor-pointer ${
              currentStep === 2 ? 'text-rose-600 underline underline-offset-4' : ''
            } ${!plan.confirmedYes || maxAccessibleStep < 2 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Places
          </button>
          <button
            type="button"
            onClick={() => plan.confirmedYes && handleGoToStep(3)}
            disabled={!plan.confirmedYes || maxAccessibleStep < 3}
            className={`hover:text-rose-600 transition-colors cursor-pointer ${
              currentStep === 3 ? 'text-rose-600 underline underline-offset-4' : ''
            } ${!plan.confirmedYes || maxAccessibleStep < 3 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Food
          </button>
          <button
            type="button"
            onClick={() => plan.confirmedYes && handleGoToStep(4)}
            disabled={!plan.confirmedYes || maxAccessibleStep < 4}
            className={`hover:text-rose-600 transition-colors cursor-pointer ${
              currentStep === 4 ? 'text-rose-600 underline underline-offset-4' : ''
            } ${!plan.confirmedYes || maxAccessibleStep < 4 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Contract
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {currentStep > 0 && currentStep < 5 && (
            <button
              type="button"
              onClick={handleRestart}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}

          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="whitespace-nowrap">
              {currentStep === 5 ? 'Approved ❤️' : 'Reservation Portal'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center py-4 md:py-8">
        {/* Step Indicator (shown during steps 1 to 5) */}
        {currentStep >= 1 && (
          <StepIndicator
            currentStep={currentStep}
            onGoToStep={handleGoToStep}
            onGoBack={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            maxAccessibleStep={maxAccessibleStep}
          />
        )}

        {/* Step 0: The Proposal with Evasive 'No' button and enthusiastic 'Yes' button */}
        {currentStep === 0 && (
          <InitialProposal
            onSayYes={handleSayYes}
            sweetheartName={plan.sweetheartName}
          />
        )}

        {/* Step 1: Pick Date and Time */}
        {currentStep === 1 && (
          <DateTimeStep
            selectedDate={plan.selectedDate}
            selectedTimeSlot={plan.selectedTimeSlot}
            customTime={plan.customTime}
            onSelectDate={(date) => setPlan((p) => ({ ...p, selectedDate: date }))}
            onSelectTimeSlot={(slot) => setPlan((p) => ({ ...p, selectedTimeSlot: slot }))}
            onUpdateCustomTime={(time) => setPlan((p) => ({ ...p, customTime: time }))}
            onNext={() => handleNextStep(2)}
            sweetheartName={plan.sweetheartName}
          />
        )}

        {/* Step 2: Pick Place (Single category box + at least 10 selectable places in Ethiopia) */}
        {currentStep === 2 && (
          <PlaceStep
            selectedCategory={plan.placeType}
            selectedSpecificPlace={plan.selectedSpecificPlace}
            placeSpecificNote={plan.placeSpecificNote}
            onSelectCategory={(category: DatePlaceType) =>
              setPlan((p) => ({ ...p, placeType: category }))
            }
            onSelectSpecificPlace={(placeName: string) =>
              setPlan((p) => ({ ...p, selectedSpecificPlace: placeName }))
            }
            onUpdateSpecificNote={(note: string) =>
              setPlan((p) => ({ ...p, placeSpecificNote: note }))
            }
            onNext={() => handleNextStep(3)}
            sweetheartName={plan.sweetheartName}
          />
        )}

        {/* Step 3: Pick What to Eat (Single category box + at least 10 selectable food items) */}
        {currentStep === 3 && (
          <FoodStep
            selectedCategory={plan.foodCategory}
            selectedFoods={plan.foodChoices}
            foodSpecialRequest={plan.foodSpecialRequest}
            onSelectCategory={(category: string) =>
              setPlan((p) => ({ ...p, foodCategory: category }))
            }
            onToggleFood={(foodName: string) =>
              setPlan((p) => {
                const exists = p.foodChoices.includes(foodName);
                const nextChoices = exists
                  ? p.foodChoices.filter((f) => f !== foodName)
                  : [...p.foodChoices, foodName];
                return { ...p, foodChoices: nextChoices };
              })
            }
            onUpdateSpecialRequest={(req: string) =>
              setPlan((p) => ({ ...p, foodSpecialRequest: req }))
            }
            onNext={() => handleNextStep(4)}
            sweetheartName={plan.sweetheartName}
          />
        )}

        {/* Step 4: Pick Payment Contract (Telebirr or CBE) */}
        {currentStep === 4 && (
          <PaymentStep
            paymentMethod={plan.paymentMethod}
            contractSigned={plan.contractSigned}
            signatureText={plan.signatureText}
            onSelectPaymentMethod={(method: PaymentMethod) =>
              setPlan((p) => ({ ...p, paymentMethod: method }))
            }
            onToggleContractSigned={(signed) => setPlan((p) => ({ ...p, contractSigned: signed }))}
            onUpdateSignature={(sig) => setPlan((p) => ({ ...p, signatureText: sig }))}
            onNext={() => handleNextStep(5)}
            sweetheartName={plan.sweetheartName}
            admirerName={plan.admirerName}
          />
        )}

        {/* Step 5: Approved Receipt - Finally Dating Granted */}
        {currentStep === 5 && (
          <ApprovedReceipt plan={plan} onRestart={handleRestart} />
        )}
      </main>

      {/* Confirmation Modal when YES is clicked on Step 0 */}
      <ConfirmYesModal
        isOpen={isConfirmModalOpen}
        sweetheartName={plan.sweetheartName}
        admirerName={plan.admirerName}
        onUpdateSweetheartName={(name) => setPlan((p) => ({ ...p, sweetheartName: name }))}
        onUpdateAdmirerName={(name) => setPlan((p) => ({ ...p, admirerName: name }))}
        onConfirm={handleConfirmYesInModal}
        onCancel={() => setIsConfirmModalOpen(false)}
      />

      {/* Minimalist, Clean Footer compliant with anti-slop rules */}
      <footer className="relative z-10 border-t border-rose-100 bg-white/60 text-slate-500 text-xs py-3 px-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <span>Made with love for sweethearts everywhere</span>
          <span className="text-rose-500">❤️</span>
          <span>&bull; Powered by Couple Maber</span>
        </div>
      </footer>
    </div>
  );
}
