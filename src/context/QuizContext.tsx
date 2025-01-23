import React, { createContext, useContext, useState, useEffect } from 'react';
import type { QuizAnswers, SkinType, Condition, Concern, TexturePreference, ScentPreference } from '../types/skincare';

interface QuizState {
  answers: Partial<QuizAnswers>;
  completed: boolean;
  currentStep: number;
}

interface QuizContextType {
  state: QuizState;
  updateAnswers: (answers: Partial<QuizAnswers>) => void;
  setCompleted: (completed: boolean) => void;
  setCurrentStep: (step: number) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  answers: {},
  completed: false,
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

  const setCompleted = (completed: boolean) => {
    setState(prev => ({ ...prev, completed }));
  };

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const resetQuiz = () => {
    setState(initialState);
  };

  return (
    <QuizContext.Provider value={{ state, updateAnswers, setCompleted, setCurrentStep, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};