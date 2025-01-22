import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { QuizAnswers } from '../types/skincare';

export default function PreviewAnswers() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  React.useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (!storedAnswers) {
      toast.error('Veuillez compléter le quiz');
      navigate('/skintype');
      return;
    }
    try {
      const parsedAnswers = JSON.parse(storedAnswers);
      setAnswers(parsedAnswers);
    } catch (error) {
      console.error('Error parsing answers:', error);
      toast.error('Une erreur est survenue');
      navigate('/skintype');
    }
  }, [navigate]);

  const handleSeeRecommendations = () => {
    if (!answers) {
      toast.error('Veuillez compléter le quiz');
      navigate('/skintype');
      return;
    }

    localStorage.setItem('validatedAnswers', JSON.stringify(answers));
    navigate('/recommendations', { replace: true, state: { answers } });
  };

  const handleBack = () => navigate(-1);

  if (!answers) return null;

  const questionsMap = {
    'Type de peau': answers.skinType || 'Non spécifié',
    'Condition': answers.conditions || 'Non spécifié',
    'Préoccupation': answers.concerns || 'Non spécifié',
    'Texture préférée': answers.texturePreference || 'Non spécifié',
    'Parfum préféré': answers.scentPreference || 'Non spécifié'
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url('/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <motion.div 
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-4xl font-playfair text-center mb-8 text-[#4A4A4A]">
              Confirmez vos réponses
            </h2>
            <div className="space-y-4 mb-8">
              {Object.entries(questionsMap).map(([question, answer], index) => (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 rounded-lg bg-white/80 border border-gray-100"
                >
                  <span className="font-medium text-[#4A4A4A]">{question}</span>
                  <span className="text-[#666] font-light">{answer}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Modifier
              </Button>
              <Button
                onClick={handleSeeRecommendations}
                className="flex items-center gap-2 bg-[#4A4A4A] hover:bg-[#3A3A3A]"
              >
                <Check className="w-4 h-4" />
                Voir les recommandations
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}