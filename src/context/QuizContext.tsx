
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { quizSteps } from '../config/quizConfig';

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
  | { type: 'SET_COMPLETED'; value: boolean }
  | { type: 'RESTORE_STATE'; value: QuizState };

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
  console.log('Validating state:', state);
  const requiredFields = ['skinType', 'conditions', 'concerns'];
  return requiredFields.every(field => {
    const isValid = Boolean(state[field]);
    console.log(`Field ${field}: ${isValid ? 'valid' : 'invalid'}`);
    return isValid;
  });
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  console.log('Reducer action:', action.type, action);
  
  switch (action.type) {
    case 'SET_ANSWER':
      const newState = {
        ...state,
        [action.field]: action.value
      };
      console.log('New state after SET_ANSWER:', newState);
      return newState;
      
    case 'CLEAR_ANSWERS':
      console.log('Clearing all answers');
      return initialState;
      
    case 'SET_COMPLETED':
      console.log('Setting completed:', action.value);
      return {
        ...state,
        completed: action.value
      };
      
    case 'RESTORE_STATE':
      console.log('Restoring state:', action.value);
      return action.value;
      
    default:
      return state;
  }
}

type QuizContextType = {
  state: QuizState;
  setAnswer: (field: keyof QuizState, value: any) => void;
  clearAnswers: () => void;
  validateAndProceed: (currentStep: string, nextStep: string) => Promise<boolean>;
};

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Quiz state updated:', state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to persist quiz state:', error);
    }
  }, [state]);

  useEffect(() => {
    restoreState();
  }, []);

  const setAnswer = (field: keyof QuizState, value: any) => {
    console.log('Setting answer:', field, value);
    dispatch({ type: 'SET_ANSWER', field, value });
  };

  const clearAnswers = () => {
    console.log('Clearing answers');
    dispatch({ type: 'CLEAR_ANSWERS' });
    localStorage.removeItem(STORAGE_KEY);
  };

  const validateAndProceed = async (currentStep: string, nextStep: string): Promise<boolean> => {
    console.log('Validating and proceeding:', { currentStep, nextStep, state });
    
    if (nextStep === 'recommendations') {
      const isValid = validateState(state);
      console.log('Validation result:', isValid);
      
      if (!isValid) {
        toast.error('Veuillez compléter toutes les questions requises');
        navigate('/skintypequiz');
        return false;
      }
      dispatch({ type: 'SET_COMPLETED', value: true });
    }
    return true;
  };

  const restoreState = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        console.log('Restoring saved state:', parsedState);
        if (validateState(parsedState)) {
          dispatch({ type: 'RESTORE_STATE', value: parsedState });
        }
      }
    } catch (error) {
      console.error('Failed to restore quiz state:', error);
    }
  };

  const value = {
    state,
    setAnswer,
    clearAnswers,
    validateAndProceed
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
