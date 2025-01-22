
import React, { createContext, useContext, useState } from 'react';
import { QuizAnswers } from '../types/skincare';

interface QuizContextType {
  answers: QuizAnswers | null;
  setAnswers: (answers: QuizAnswers | null) => void;
  validateAnswers: () => boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  const validateAnswers = (): boolean => {
    console.group('QuizContext - Validating Answers');
    console.log('Current answers:', answers);

    if (!answers) {
      console.error('No answers found');
      console.groupEnd();
      return false;
    }

    const requiredFields: (keyof QuizAnswers)[] = ['skinType', 'conditions', 'concerns'];
    const missingFields = requiredFields.filter(field => !answers[field]);

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      console.groupEnd();
      return false;
    }

    console.log('All required fields present');
    console.groupEnd();
    return true;
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswers, validateAnswers }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
}
