import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type QuizState = {
  skinType: string;
  conditions: string;
  concerns: string;
  zones: string[];
  treatment: string;
  fragrance: string;
  routine: string;
  newsletter: boolean;
  completed: boolean;
};

type QuizAction = 
  | { type: 'SET_ANSWER'; field: keyof QuizState; value: any }
  | { type: 'CLEAR_ANSWERS' }
  | { type: 'SET_COMPLETED'; value: boolean };

const initialState: QuizState = {
  skinType: '',
  conditions: '',
  concerns: '',
  zones: [],
  treatment: '',
  fragrance: '',
  routine: '',
  newsletter: false,
  completed: false
};

const STORAGE_KEY = 'quiz_state';

function validateState(state: QuizState): boolean {
  const requiredFields = ['skinType', 'conditions', 'concerns'];
  return requiredFields.every(field => Boolean(state[field]));
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_COMPLETED':
      return {
        ...state,
        completed: action.value
      };
    case 'CLEAR_ANSWERS':
      return initialState;
    default:
      return state;
  }
}

interface QuizContextType extends QuizState {
  setAnswer: (field: keyof QuizState, value: any) => void;
  clearAnswers: () => void;
  validateAndProceed: (currentStep: string, nextStep: string) => void;
  restoreState: () => boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    restoreState();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to persist quiz state:', error);
    }
  }, [state]);

  const setAnswer = (field: keyof QuizState, value: any) => {
    dispatch({ type: 'SET_ANSWER', field, value });
  };

  const clearAnswers = () => {
    dispatch({ type: 'CLEAR_ANSWERS' });
    localStorage.removeItem(STORAGE_KEY);
  };

  const validateAndProceed = (currentStep: string, nextStep: string) => {
    const isValid = validateState(state);

    if (nextStep === 'recommendations' && !isValid) {
      toast.error('Veuillez compléter toutes les questions requises');
      navigate('/skintypequiz');
      return;
    }

    if (nextStep === 'recommendations') {
      dispatch({ type: 'SET_COMPLETED', value: true });
    }

    navigate(`/${nextStep.toLowerCase()}`);
  };

  const restoreState = (): boolean => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        if (validateState(parsedState)) {
          dispatch({ type: 'SET_COMPLETED', value: parsedState.completed }); //Added this line to restore completed status.
          dispatch({ type: 'RESTORE_STATE', value: parsedState });
          return true;
        }
      }
    } catch (error) {
      console.error('Failed to restore quiz state:', error);
    }
    return false;
  };

  return (
    <QuizContext.Provider value={{
      ...state,
      setAnswer,
      clearAnswers,
      validateAndProceed,
      restoreState
    }}>
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