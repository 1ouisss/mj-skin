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
      const parsedState = saved ? JSON.parse(saved) : initialState;
      return validateRestoredState(parsedState) ? parsedState : initialState;
    } catch (error) {
      console.error('Failed to restore quiz state:', error);
      return initialState;
    }
  });

  const validateRestoredState = (state: QuizState): boolean => {
    return (
      state &&
      typeof state.currentStep === 'number' &&
      typeof state.completed === 'boolean' &&
      typeof state.answers === 'object'
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save quiz state:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your progress. Please try again.',
        variant: 'destructive',
      });
    }
  }, [state]);

  const updateAnswers = (step: number, answers: any) => {
    try {
      setState(prev => ({
        ...prev,
        currentStep: step,
        answers: { ...prev.answers, ...answers },
        errors: {} // Clear previous errors
      }));
    } catch (error) {
      console.error('Failed to update answers:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your answers. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const validateState = () => {
    const { skinType, condition, concerns } = state.answers;
    const errors: Record<string, string> = {};
    
    if (!skinType) errors.skinType = 'Skin type is required';
    if (!condition) errors.condition = 'Condition is required';
    if (!concerns) errors.concerns = 'Concerns are required';
    
    setState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const markComplete = async () => {
    if (!validateState()) {
      toast({
        title: 'Incomplete Information',
        description: 'Please fill in all required fields before continuing.',
        variant: 'destructive',
      });
      return;
    }
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