import React, { createContext, useContext, useState } from 'react';
import type { SkinType, Concern } from '../types/skincare';

interface QuizState {
  skinType: SkinType | null;
  conditions: string | null;
  concerns: Concern[] | null;
  texturePreference: string | null;
  scentPreference: string | null;
  completed: boolean;
}

interface QuizContextType {
  state: QuizState;
  setState: React.Dispatch<React.SetStateAction<QuizState>>;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  skinType: null,
  conditions: null,
  concerns: null,
  texturePreference: null,
  scentPreference: null,
  completed: false,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QuizState>(initialState);

  const resetQuiz = () => {
    setState(initialState);
  };

  return (
    <QuizContext.Provider value={{ state, setState, resetQuiz }}>
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