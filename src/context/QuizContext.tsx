
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuizContextType {
  answers: any;
  setAnswers: (answers: any) => void;
  validateAndProceed: (currentStep: string, nextStep: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (storedAnswers) {
      try {
        setAnswers(JSON.parse(storedAnswers));
      } catch (e) {
        console.error('Error parsing stored answers:', e);
        localStorage.removeItem('quizAnswers');
      }
    }
  }, []);

  const validateAndProceed = (currentStep: string, nextStep: string) => {
    const stored = localStorage.getItem('quizAnswers');
    if (!stored) {
      console.error('No quiz answers found');
      navigate('/');
      return;
    }
    
    navigate(`/${nextStep.toLowerCase()}`);
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswers, validateAndProceed }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
