import React, { createContext, useContext, useState } from 'react';
import type { SkinType, Condition, Concern, TexturePreference, ScentPreference } from '../types/skincare';

interface QuizState {
  currentStep: number;
  skinType: SkinType | null;
  conditions: Condition | null;
  concerns: Concern[];
  texturePreference: TexturePreference | null;
  scentPreference: ScentPreference | null;
  completed: boolean;
}

interface QuizContextType {
  state: QuizState;
  updateAnswers: (newState: Partial<QuizState>) => void;
  validateCurrentStep: () => { valid: boolean; message?: string };
  restoreState: () => Promise<boolean>;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  currentStep: 0,
  skinType: null,
  conditions: null,
  concerns: [],
  texturePreference: null,
  scentPreference: null,
  completed: false
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialState);

  const updateAnswers = (newState: Partial<QuizState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const validateCurrentStep = () => {
    const { currentStep, skinType, conditions, concerns } = state;
    
    switch (currentStep) {
      case 0:
        return { valid: !!skinType, message: 'Veuillez sélectionner un type de peau' };
      case 1:
        return { valid: !!conditions, message: 'Veuillez sélectionner une condition' };
      case 2:
        return { valid: concerns.length > 0, message: 'Veuillez sélectionner au moins une préoccupation' };
      default:
        return { valid: true };
    }
  };

  const restoreState = async (): Promise<boolean> => {
    try {
      const savedState = localStorage.getItem('quizState');
      if (savedState) {
        setState(JSON.parse(savedState));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to restore state:', error);
      return false;
    }
  };

  const resetQuiz = () => {
    setState(initialState);
    localStorage.removeItem('quizState');
  };

  return (
    <QuizContext.Provider value={{
      state,
      updateAnswers,
      validateCurrentStep,
      restoreState,
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