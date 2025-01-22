
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Quiz = () => {
  const { state, validateAndProceed } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateAndProceed('quiz', 'recommendations');
    
    if (isValid) {
      navigate('/recommendations');
    } else {
      toast.error('Veuillez compléter toutes les questions requises');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Quiz questions will be rendered by QuizStep component */}
      </div>
      <button 
        type="submit"
        className="w-full px-4 py-2 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
      >
        Voir mes recommandations
      </button>
    </form>
  );
};

export default Quiz;
