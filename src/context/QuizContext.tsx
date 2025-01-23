
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

interface QuizContextType extends QuizState {
  updateAnswers: (step: number, newAnswers: Partial<QuizState['answers']>) => void;
  markComplete: () => boolean;
  resetQuiz: () => void;
  validateState: () => boolean;
  getError: (field: keyof QuizState['answers']) => string | undefined;
}

const STORAGE_KEY = 'quiz_state';

const initialState: QuizState = {
  currentStep: 0,
  answers: {},
  errors: {},
  completed: false,
};

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch (error) {
      console.error('Error loading saved state:', error);
      return initialState;
    }
  });

  const validateField = (field: keyof QuizState['answers'], value: any): string | undefined => {
    if (!value) return 'This field is required';
    
    switch (field) {
      case 'skinType':
        return ['Sèche', 'Grasse', 'Mixte', 'Sensible', 'Normale'].includes(value) 
          ? undefined 
          : 'Invalid skin type';
      case 'concerns':
        return Array.isArray(value) && value.length > 0 
          ? undefined 
          : 'At least one concern must be selected';
      default:
        return undefined;
    }
  };

  const validateState = () => {
    const requiredFields: (keyof QuizState['answers'])[] = [
      'skinType',
      'condition',
      'concerns',
      'texturePreference',
      'scentPreference',
    ];

    const newErrors: Record<string, string> = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      const error = validateField(field, state.answers[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setState(prev => ({ ...prev, errors: newErrors }));
    return isValid;
  };

  const updateAnswers = (step: number, newAnswers: Partial<QuizState['answers']>) => {
    setState((prev) => {
      const updatedState = {
        ...prev,
        currentStep: step,
        answers: { ...prev.answers, ...newAnswers },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      } catch (error) {
        console.error('Error saving state:', error);
      }
      return updatedState;
    });
  };

  const markComplete = () => {
    const isValid = validateState();
    if (isValid) {
      setState(prev => ({ ...prev, completed: true }));
      return true;
    }
    return false;
  };

  const resetQuiz = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  const getError = (field: keyof QuizState['answers']) => state.errors[field];

  return (
    <QuizContext.Provider value={{
      ...state,
      updateAnswers,
      markComplete,
      resetQuiz,
      validateState,
      getError
    }}>
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
