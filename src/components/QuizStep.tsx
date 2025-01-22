
import React from 'react';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { QuizStep as QuizStepType } from '../config/quizConfig';

interface QuizStepProps {
  step: QuizStepType;
  onNext: () => void;
}

export function QuizStep({ step, onNext }: QuizStepProps) {
  const { state, setAnswer, validateAndProceed } = useQuiz();
  const navigate = useNavigate();

  const handleOptionClick = async (value: string) => {
    setAnswer(step.field as keyof typeof state, value);
    
    const isValid = await validateAndProceed(step.id, step.nextStep || '');
    if (isValid) {
      if (step.nextStep === 'recommendations') {
        navigate('/recommendations');
      } else {
        onNext();
      }
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        background: step.backgroundImage ? `url('${step.backgroundImage}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-[#222222] text-center mb-12"
          >
            {step.title}
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {step.options.map((option, index) => (
              <motion.button
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(option.value)}
                className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#222222] rounded-full py-4 px-6 shadow-lg transition-colors"
              >
                {option.icon && <option.icon className="w-6 h-6 stroke-[1.5]" />}
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
