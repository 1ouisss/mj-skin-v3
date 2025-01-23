
import React from 'react';
import { useLocation } from 'react-router-dom';

const QUIZ_STEPS = [
  '/skintypequiz',
  '/conditionsquiz',
  '/concernsquiz',
  '/zonesquiz',
  '/treatmentquiz',
  '/fragrancequiz',
  '/routinequiz',
  '/newsletterquiz',
  '/preview',
  '/recommendations'
];

export function ProgressBar() {
  const location = useLocation();
  const currentStep = QUIZ_STEPS.indexOf(location.pathname) + 1;
  const progress = (currentStep / QUIZ_STEPS.length) * 100;

  return (
    <div className="w-full px-4 py-2 fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div 
            className="absolute h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 text-sm text-center text-gray-600">
          Étape {currentStep} sur {QUIZ_STEPS.length}
        </div>
      </div>
    </div>
  );
}
