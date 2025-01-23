
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

const QUIZ_STEPS = [
  '/skintypequiz',
  '/conditionsquiz',
  '/concernsquiz',
  '/zonesquiz',
  '/treatmentquiz',
  '/fragrancequiz',
  '/routinequiz',
  '/preview',
  '/recommendations'
];

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = QUIZ_STEPS.indexOf(location.pathname);
  const isFirstStep = currentStepIndex <= 0;

  const handleBack = () => {
    if (!isFirstStep) {
      navigate(QUIZ_STEPS[currentStepIndex - 1]);
    }
  };

  if (location.pathname === '/') return null;

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      disabled={isFirstStep}
      className="absolute top-4 left-4 z-50"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Retour
    </Button>
  );
}
