
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { quizSteps } from '../config/quizConfig';

const Quiz = () => {
  const { currentStep, answers, updateAnswers, validateState, markComplete } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentStepConfig = quizSteps[currentStep];
    if (!currentStepConfig) {
      toast.error('Invalid quiz step');
      return;
    }

    if (currentStep === quizSteps.length - 1) {
      if (validateState()) {
        await markComplete();
        navigate('/recommendations');
      } else {
        toast.error('Veuillez compléter toutes les questions requises.');
      }
    } else {
      const nextStep = currentStep + 1;
      updateAnswers(nextStep, answers);
      navigate(`/${quizSteps[nextStep].id}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="quiz-progress mb-8">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {quizSteps[currentStep]?.component}

            <div className="flex justify-between pt-6">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Retour
                </Button>
              )}
              <Button
                type="submit"
                className="ml-auto"
              >
                {currentStep === quizSteps.length - 1 ? 'Voir les recommandations' : 'Suivant'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Quiz;
