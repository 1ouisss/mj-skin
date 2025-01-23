
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SkinType, Condition, Concern } from '../types/skincare';

interface QuizState {
  answers: {
    skinType?: SkinType;
    condition?: Condition;
    concerns?: Concern;
    texturePreference?: string;
    scentPreference?: string;
    newsletter?: boolean;
  };
  completed: boolean;
}

interface QuizContextType extends QuizState {
  updateAnswers: (newAnswers: Partial<QuizState['answers']>) => void;
  markComplete: () => void;
  resetQuiz: () => void;
  validateState: () => boolean;
}

const STORAGE_KEY = 'quiz_state';

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

const loadSavedState = (): QuizState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading saved state:', error);
  }
  return null;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(() => {
    return loadSavedState() || {
      answers: {},
      completed: false,
    };
  });

  const validateState = () => {
    const requiredFields: (keyof QuizState['answers'])[] = [
      'skinType',
      'condition',
      'concerns',
      'texturePreference',
      'scentPreference',
    ];
    return requiredFields.every((field) => state.answers[field]);
  };

  const updateAnswers = (newAnswers: Partial<QuizState['answers']>) => {
    setState((prev) => {
      const updatedState = {
        ...prev,
        answers: { ...prev.answers, ...newAnswers },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const markComplete = () => {
    if (validateState()) {
      setState((prev) => {
        const updatedState = { ...prev, completed: true };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
        return updatedState;
      });
    } else {
      console.warn('Cannot mark as complete: missing required fields');
    }
  };

  const resetQuiz = () => {
    const initialState = { answers: {}, completed: false };
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <QuizContext.Provider value={{ 
      ...state, 
      updateAnswers, 
      markComplete, 
      resetQuiz,
      validateState 
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
