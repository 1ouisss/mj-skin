
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useQuiz } from '../context/QuizContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { quizSteps } from '../config/quizConfig';
import { ErrorBoundary } from '../components/ErrorBoundary';

const Quiz = () => {
  const { state, updateAnswers, validateState, markComplete } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!state || typeof state.currentStep !== 'number') {
        throw new Error('Invalid quiz state');
      }

      const currentStepConfig = quizSteps[state.currentStep];
      if (!currentStepConfig) {
        throw new Error('Invalid quiz step');
      }

      if (state.currentStep === quizSteps.length - 1) {
        if (validateState()) {
          await markComplete();
          navigate('/recommendations');
        } else {
          toast.error('Please complete all required questions');
        }
      } else {
        const nextStep = state.currentStep + 1;
        if (nextStep < quizSteps.length) {
          updateAnswers(nextStep, state.answers);
          navigate(`/${quizSteps[nextStep].id}`);
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleBack = () => {
    try {
      if (state.currentStep > 0) {
        const prevStep = state.currentStep - 1;
        updateAnswers(prevStep, state.answers);
        navigate(`/${quizSteps[prevStep].id}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('An error occurred while going back');
    }
  };

  return (
    <ErrorBoundary>
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
                    style={{ width: `${((state.currentStep + 1) / quizSteps.length) * 100}%` }}
                  />
                </div>
              </div>
              {quizSteps[state.currentStep]?.component}
              <div className="flex justify-between mt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleBack}
                  disabled={state.currentStep === 0}
                >
                  Back
                </Button>
                <Button type="submit">
                  {state.currentStep === quizSteps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </ErrorBoundary>
  );
};

export default Quiz;
