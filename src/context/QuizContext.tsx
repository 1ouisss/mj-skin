import React, { createContext, useContext, useState, useEffect } from 'react';

interface QuizContextType {
  answers: Record<string, string>;
  completed: boolean;
  updateAnswers: (newAnswers: Partial<typeof answers>) => void;
  markComplete: () => void;
  resetQuiz: () => void;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  const updateAnswers = (newAnswers: Partial<typeof answers>) => {
    setAnswers(prev => ({ ...prev, ...newAnswers }));
  };

  const markComplete = () => {
    const requiredFields = ['skinType', 'condition', 'concerns', 'texturePreference', 'scentPreference'];
    const isComplete = requiredFields.every(field => answers[field]);

    if (isComplete) {
      setCompleted(true);
    } 
  };

  const resetQuiz = () => {
    setAnswers({});
    setCompleted(false);
  };

  useEffect(() => {
  }, [answers, completed]);

  return (
    <QuizContext.Provider value={{ 
      answers, 
      completed, 
      updateAnswers, 
      markComplete, 
      resetQuiz 
    }}>
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