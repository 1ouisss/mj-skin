
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

const STORAGE_KEY = 'quizAnswers';

const validateState = (state: any): state is QuizState => {
  try {
    if (!state || typeof state !== 'object') return false;
    const requiredFields = ['skinType', 'conditions', 'concerns'];
    const hasRequiredFields = requiredFields.every(field => typeof state[field] === 'string');
    if (!hasRequiredFields) return false;
    
    // Validate field values
    if (state.skinType && !['dry', 'oily', 'combination', 'normal', 'sensitive'].includes(state.skinType)) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('State validation error:', error);
    return false;
  }
};

const persistState = (state: QuizState) => {
  try {
    if (DEBUG) {
      console.group('[QuizContext] State Persistence');
      console.log('Persisting state:', state);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('[QuizContext] Failed to persist state:', error);
    return false;
  }
};

const loadPersistedState = (): QuizState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsedState = JSON.parse(stored);
    if (!validateState(parsedState)) {
      console.warn('[QuizContext] Invalid persisted state, resetting');
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    if (DEBUG) console.log('[QuizContext] Loaded persisted state:', parsedState);
    return parsedState;
  } catch (error) {
    console.error('[QuizContext] Failed to load persisted state:', error);
    return null;
  }
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  if (DEBUG) console.log('[QuizContext] Reducer action:', action.type, action);
  
  switch (action.type) {
    case 'SET_ANSWER': {
      const newState = { ...state, [action.field]: action.value };
      persistState(newState);
      return newState;
    }
    case 'CLEAR_ANSWERS': {
      localStorage.removeItem(STORAGE_KEY);
      return initialState;
    }
    case 'RESTORE_STATE': {
      if (!validateState(action.state)) {
        console.error('[QuizContext] Invalid state restoration attempt');
        return state;
      }
      return action.state;
    }
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
    console.log('[QuizContext] Provider mounted, attempting state restoration');
    restoreState();
  }, []);

  const restoreState = (): boolean => {
    const persistedState = loadPersistedState();
    if (persistedState && validateState(persistedState)) {
      dispatch({ type: 'RESTORE_STATE', state: persistedState });
      console.log('[QuizContext] State restored successfully:', persistedState);
      return true;
    }
    console.warn('[QuizContext] No valid state to restore');
    return false;
  };

  const setAnswer = (field: keyof QuizState, value: string) => {
    if (DEBUG) console.log('[QuizContext] Setting answer:', field, value);
    dispatch({ type: 'SET_ANSWER', field, value });
  };

  const validateAndProceed = (currentStep: string, nextStep: string) => {
    if (DEBUG) {
      console.group('[QuizContext] validateAndProceed');
      console.log('Current step:', currentStep);
      console.log('Next step:', nextStep);
      console.log('Current state:', state);
    }

    if (nextStep === 'recommendations' || nextStep === 'previewanswers') {
      const requiredFields = ['skinType', 'conditions', 'concerns'];
      const missingFields = requiredFields.filter(field => !state[field]);
      
      if (missingFields.length > 0) {
        console.warn('Missing required fields:', missingFields);
        toast.error('Veuillez compléter toutes les questions requises');
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
    if (DEBUG) console.log('[QuizContext] Clearing answers');
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
