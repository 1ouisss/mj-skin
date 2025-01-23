import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SkinType, Condition, Concern } from '../types/skincare';

interface QuizState {
  currentStep: number;
  answers: {
    skinType?: SkinType;
    condition?: Condition;
    concerns?: Concern;
    texturePreference?: string;
    scentPreference?: string;
    newsletter?: boolean;
  };
  errors: Record<string, string>;
  completed: boolean;
}

const QuizContext = createContext<{
  state: QuizState;
  setState: React.Dispatch<React.SetStateAction<QuizState>>;
  updateAnswers: (step: number, answers: any) => void;
  validateState: () => boolean;
  markComplete: () => Promise<void>;
} | null>(null);

const STORAGE_KEY = 'quiz_state';

const initialState: QuizState = {
  currentStep: 0,
  answers: {},
  errors: {},
  completed: false
};

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<QuizState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch (error) {
      console.error('Failed to restore quiz state:', error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save quiz state:', error);
    }
  }, [state]);

  const updateAnswers = (step: number, answers: any) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
      answers: { ...prev.answers, ...answers }
    }));
  };

  const validateState = () => {
    const { skinType, condition, concerns } = state.answers;
    return Boolean(skinType && condition && concerns);
  };

  const markComplete = async () => {
    setState(prev => ({ ...prev, completed: true }));
  };

  return (
    <QuizContext.Provider value={{ state, setState, updateAnswers, validateState, markComplete }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};