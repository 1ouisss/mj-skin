
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Quiz = () => {
  const { state, validateAndProceed } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const canProceed = await validateAndProceed('quiz', 'recommendations');
    
    if (canProceed) {
      navigate('/recommendations');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quiz questions rendered by QuizStep component */}
      <button 
        type="submit"
        className="w-full px-4 py-2 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
      >
        Voir les recommandations
      </button>
    </form>
  );
};

export default Quiz;
