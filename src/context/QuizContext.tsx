
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { QuizAnswers } from '../types/skincare';

interface QuizState {
  answers: Partial<QuizAnswers>;
  completed: boolean;
  currentStep: number;
}

interface QuizContextType {
  state: QuizState;
  updateAnswers: (answers: Partial<QuizAnswers>) => void;
  setCompleted: (completed: boolean) => void;
  setCurrentStep: (step: number) => boolean;
  resetQuiz: () => void;
  validateCurrentStep: () => { valid: boolean; message?: string };
}

const validateStep = (state: QuizState): { valid: boolean; message?: string } => {
  if (!state || typeof state.currentStep !== 'number') {
    return { valid: false, message: 'Invalid quiz state' };
  }

  const currentStep = quizSteps[state.currentStep];
  if (!currentStep) {
    return { valid: false, message: 'Invalid quiz step' };
  }

  const currentAnswer = state.answers[currentStep.field];
  if (currentStep.required && !currentAnswer) {
    return { valid: false, message: 'Please answer this question before continuing' };
  }

  return { valid: true };
};

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
