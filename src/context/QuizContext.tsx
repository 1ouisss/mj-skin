
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
  console.group('State Validation');
  console.log('Current state:', state);
  const requiredFields = ['skinType', 'conditions', 'concerns'];
  const isValid = requiredFields.every(field => {
    const fieldValid = Boolean(state[field]);
    console.log(`Field ${field}: ${fieldValid ? 'valid' : 'invalid'}`);
    return fieldValid;
  });
  console.log('Overall validation result:', isValid);
  console.groupEnd();
  return isValid;
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  console.group('Quiz Reducer');
  console.log('Current state:', state);
  console.log('Action:', action);
  
  let newState: QuizState;
  
  switch (action.type) {
    case 'SET_ANSWER':
      newState = {
        ...state,
        [action.field]: action.value
      };
      break;
      
    case 'CLEAR_ANSWERS':
      newState = initialState;
      break;
      
    case 'SET_COMPLETED':
      newState = {
        ...state,
        completed: action.value
      };
      break;
      
    case 'RESTORE_STATE':
      newState = action.value;
      break;
      
    default:
      newState = state;
  }
  
  console.log('New state:', newState);
  console.groupEnd();
  return newState;
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
    console.group('Quiz State Update');
    console.log('Saving state to localStorage:', state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      console.log('State saved successfully');
    } catch (error) {
      console.error('Failed to persist quiz state:', error);
    }
    console.groupEnd();
  }, [state]);

  useEffect(() => {
    console.log('Initializing Quiz Provider - Restoring state');
    restoreState();
  }, []);

  const setAnswer = (field: keyof QuizState, value: any) => {
    console.group('Setting Answer');
    console.log(`Field: ${field}, Value:`, value);
    dispatch({ type: 'SET_ANSWER', field, value });
    console.groupEnd();
  };

  const clearAnswers = () => {
    console.log('Clearing all answers');
    dispatch({ type: 'CLEAR_ANSWERS' });
    localStorage.removeItem(STORAGE_KEY);
  };

  const validateAndProceed = async (currentStep: string, nextStep: string): Promise<boolean> => {
    console.group('Validation and Navigation');
    console.log('Current step:', currentStep);
    console.log('Next step:', nextStep);
    console.log('Current state:', state);
    
    if (nextStep === 'recommendations') {
      const isValid = validateState(state);
      console.log('Recommendations validation result:', isValid);
      
      if (!isValid) {
        console.warn('Invalid state detected');
        toast.error('Veuillez compléter toutes les questions requises');
        if (!state.skinType) {
          navigate('/skintypequiz');
        } else if (!state.conditions) {
          navigate('/conditionsquiz');
        } else if (!state.concerns) {
          navigate('/concernsquiz');
        }
        console.groupEnd();
        return false;
      }
      
      dispatch({ type: 'SET_COMPLETED', value: true });
      console.log('Quiz marked as completed');
      console.groupEnd();
      return true;
    }
    console.groupEnd();
    return true;
  };

  const restoreState = () => {
    console.group('State Restoration');
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        console.log('Found saved state:', parsedState);
        if (validateState(parsedState)) {
          console.log('Restoring valid saved state');
          dispatch({ type: 'RESTORE_STATE', value: parsedState });
        } else {
          console.warn('Saved state validation failed');
        }
      } else {
        console.log('No saved state found');
      }
    } catch (error) {
      console.error('Failed to restore quiz state:', error);
    }
    console.groupEnd();
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
