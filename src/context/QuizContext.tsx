
import React, { createContext, useContext, useReducer } from 'react';
import { QuizAnswers } from '../types/skincare';

type QuizState = {
  answers: Partial<QuizAnswers>;
};

type QuizAction = 
  | { type: 'SET_ANSWER'; field: keyof QuizAnswers; value: string }
  | { type: 'RESET_ANSWERS' };

const initialState: QuizState = {
  answers: {}
};

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | undefined>(undefined);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.field]: action.value
        }
      };
    case 'RESET_ANSWERS':
      return initialState;
    default:
      return state;
  }
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
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
