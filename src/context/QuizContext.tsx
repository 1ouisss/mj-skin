import React, { createContext, useContext, useState } from 'react';
import type { SkinType, Concern } from '../types/skincare';

interface QuizState {
  currentStep: number;
  skinType: SkinType | null;
  conditions: string | null;
  concerns: Concern[] | null;
  texturePreference: string | null;
  scentPreference: string | null;
  completed: boolean;
  answers: Record<string, any>;
}

interface QuizContextType {
  state: QuizState;
  setState: React.Dispatch<React.SetStateAction<QuizState>>;
  resetQuiz: () => void;
  updateAnswers: (field: string, value: any) => void;
  validateCurrentStep: () => { valid: boolean; message?: string };
  restoreState: () => Promise<boolean>;
}

const initialState: QuizState = {
  currentStep: 0,
  skinType: null,
  conditions: null,
  concerns: null,
  texturePreference: null,
  scentPreference: null,
  completed: false,
  answers: {}
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialState);

  const resetQuiz = () => {
    setState(initialState);
  };

  const updateAnswers = (field: string, value: any) => {
    setState(prev => ({
      ...prev,
      [field]: value,
      answers: { ...prev.answers, [field]: value }
    }));
  };

  const validateCurrentStep = () => {
    const currentStep = state.currentStep;
    if (currentStep === 0 && !state.skinType) {
      return { valid: false, message: 'Veuillez sélectionner un type de peau' };
    }
    return { valid: true };
  };

  const restoreState = async () => {
    try {
      const savedState = localStorage.getItem('quizState');
      if (savedState) {
        setState(JSON.parse(savedState));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error restoring state:', error);
      return false;
    }
  };

  const value = {
    state,
    setState,
    resetQuiz,
    updateAnswers,
    validateCurrentStep,
    restoreState
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export default QuizContext;