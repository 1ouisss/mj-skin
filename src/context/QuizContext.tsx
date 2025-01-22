
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DEBUG = true;

type QuizState = {
  skinType: string;
  conditions: string;
  concerns: string;
  texturePreference?: string;
  scentPreference?: string;
};

type QuizAction = 
  | { type: 'SET_ANSWER'; field: keyof QuizState; value: string }
  | { type: 'CLEAR_ANSWERS' }
  | { type: 'RESTORE_STATE'; state: QuizState };

const initialState: QuizState = {
  skinType: '',
  conditions: '',
  concerns: '',
  texturePreference: '',
  scentPreference: ''
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_ANSWER':
      const newState = { ...state, [action.field]: action.value };
      try {
        localStorage.setItem('quizAnswers', JSON.stringify(newState));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
      return newState;
    case 'CLEAR_ANSWERS':
      localStorage.removeItem('quizAnswers');
      return initialState;
    case 'RESTORE_STATE':
      return action.state;
    default:
      return state;
  }
}

interface QuizContextType {
  state: QuizState;
  setAnswer: (field: keyof QuizState, value: string) => void;
  validateAndProceed: (currentStep: string, nextStep: string) => void;
  clearAnswers: () => void;
  restoreState: () => boolean;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    restoreState();
  }, []);

  const restoreState = (): boolean => {
    try {
      const stored = localStorage.getItem('quizAnswers');
      if (!stored) return false;

      const parsedState = JSON.parse(stored) as QuizState;
      dispatch({ type: 'RESTORE_STATE', state: parsedState });
      return true;
    } catch (error) {
      console.error('Failed to restore state:', error);
      return false;
    }
  };

  const setAnswer = (field: keyof QuizState, value: string) => {
    dispatch({ type: 'SET_ANSWER', field, value });
  };

  const validateAndProceed = (currentStep: string, nextStep: string) => {
    if (DEBUG) {
      console.group('QuizContext - validateAndProceed');
      console.log('Current step:', currentStep);
      console.log('Next step:', nextStep);
      console.log('Current state:', state);
    }

    if (nextStep === 'previewanswers') {
      if (!state.skinType || !state.conditions || !state.concerns) {
        toast.error('Veuillez compléter toutes les questions requises');
        navigate('/skintypequiz');
        return;
      }
    }

    if (DEBUG) {
      console.log('Validation passed, navigating to:', nextStep);
      console.groupEnd();
    }

    navigate(`/${nextStep.toLowerCase()}`);
  };

  const clearAnswers = () => {
    dispatch({ type: 'CLEAR_ANSWERS' });
  };

  return (
    <QuizContext.Provider value={{ 
      state, 
      setAnswer, 
      validateAndProceed, 
      clearAnswers,
      restoreState 
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
