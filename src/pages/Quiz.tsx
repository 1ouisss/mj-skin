
import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { quizSteps } from '../config/quizConfig';
import { toast } from 'sonner';

const Quiz = () => {
  const { state, updateAnswers, validateState, markComplete } = useQuiz();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentStep = quizSteps.find(step => location.pathname.includes(step.id));
    if (!currentStep) {
      navigate('/skintypequiz');
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateState()) {
      toast.error('Veuillez compléter toutes les questions requises.');
      navigate('/skintypequiz');
      return;
    }

    try {
      await markComplete();
      navigate('/recommendations');
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.');
      console.error('Navigation error:', error);
    }
  };

  const currentStepIndex = quizSteps.findIndex(step => 
    location.pathname.includes(step.id)
  );

  const handleNext = () => {
    if (currentStepIndex < quizSteps.length - 1) {
      navigate(`/${quizSteps[currentStepIndex + 1].id}`);
    }
  };

  return (
    <div className="quiz-container p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="quiz-content">
          {/* Current step content rendered by parent route */}
        </div>
        
        <div className="flex justify-between mt-8">
          {currentStepIndex === quizSteps.length - 1 ? (
            <button 
              type="submit"
              className="w-full px-6 py-3 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
            >
              Voir les recommandations
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full px-6 py-3 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
            >
              Suivant
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Quiz;
