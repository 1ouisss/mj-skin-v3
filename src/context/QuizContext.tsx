
import React, { createContext, useContext, useState } from 'react';
import type { QuizAnswers } from '../types/skincare';

interface QuizState {
  answers: Partial<QuizAnswers>;
  currentStep: number;
}

interface QuizContextType {
  state: QuizState;
  updateAnswers: (answers: Partial<QuizAnswers>) => void;
  setCurrentStep: (step: number) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  answers: {},
  currentStep: 0
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialState);

  const updateAnswers = (newAnswers: Partial<QuizAnswers>) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, ...newAnswers }
    }));
  };

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const resetQuiz = () => {
    setState(initialState);
  };

  return (
    <QuizContext.Provider value={{
      state,
      updateAnswers,
      setCurrentStep,
      resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export default QuizContext;
