
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DEBUG = true;

function logDebug(message: string, data?: any) {
  if (DEBUG) {
    console.group('QuizContext Debug');
    console.log(message);
    if (data) console.log(data);
    console.groupEnd();
  }
}

interface QuizContextType {
  answers: any;
  setAnswers: (answers: any) => void;
  validateAndProceed: (currentStep: string, nextStep: string) => void;
  clearAnswers: () => void;
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
    console.group('QuizContext - validateAndProceed');
    console.log('Current step:', currentStep);
    console.log('Next step:', nextStep);
    console.log('Current answers:', answers);

    const stored = localStorage.getItem('quizAnswers');
    if (!stored) {
      console.error('No quiz answers found');
      navigate('/');
      return;
    }

    const parsedAnswers = JSON.parse(stored);
    
    if (nextStep === 'previewanswers') {
      if (!parsedAnswers.skinType || !parsedAnswers.conditions || !parsedAnswers.concerns) {
        console.error('Missing required fields');
        navigate('/skintypequiz');
        return;
      }
    }
    
    console.log('Navigating to:', nextStep);
    console.groupEnd();
    navigate(`/${nextStep.toLowerCase()}`);
  };

  const clearAnswers = () => {
    localStorage.removeItem('quizAnswers');
    setAnswers({});
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswers, validateAndProceed, clearAnswers }}>
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
