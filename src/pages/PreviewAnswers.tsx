
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import type { QuizAnswers } from '../types/skincare';

const PreviewAnswers = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = React.useState<QuizAnswers>({
    skinType: '' as any,
    conditions: '' as any,
    concerns: '' as any,
    texturePreference: '',
    scentPreference: '',
    newsletter: ''
  });

  React.useEffect(() => {
    try {
      const loadedAnswers = {
        skinType: JSON.parse(localStorage.getItem('skinType') || '""'),
        conditions: JSON.parse(localStorage.getItem('conditions') || '""'),
        concerns: JSON.parse(localStorage.getItem('concerns') || '""'),
        texturePreference: JSON.parse(localStorage.getItem('texturePreference') || localStorage.getItem('texture') || '""'),
        scentPreference: JSON.parse(localStorage.getItem('scentPreference') || localStorage.getItem('fragrance') || '""'),
        newsletter: localStorage.getItem('newsletter') || ''
      };

      console.log('Loaded answers:', loadedAnswers);

      if (!loadedAnswers.skinType || !loadedAnswers.conditions || !loadedAnswers.concerns) {
        toast.error('Veuillez compléter toutes les questions requises');
        navigate('/skin-type-quiz');
        return;
      }

      setAnswers(loadedAnswers as QuizAnswers);
    } catch (error) {
      console.error('Error loading answers:', error);
      toast.error('Une erreur est survenue lors du chargement de vos réponses');
      navigate('/skin-type-quiz');
    }
  }, [navigate]);

  const questionsMap = {
    "Type de peau": answers.skinType,
    "Conditions particulières": answers.conditions,
    "Préoccupations principales": answers.concerns,
    "Préférences de texture": answers.texturePreference || '---',
    "Préférences de parfum": answers.scentPreference || '---'
  };

  const validateAnswers = (): boolean => {
    if (!answers.skinType || !answers.conditions || !answers.concerns) {
      toast.error('Veuillez compléter toutes les questions requises');
      return false;
    }
    return true;
  };

  const handleSeeRecommendations = () => {
    try {
      if (!validateAnswers()) return;

      const payload = {
        skinType: answers.skinType,
        conditions: answers.conditions,
        concerns: answers.concerns,
        texturePreference: answers.texturePreference || '',
        scentPreference: answers.scentPreference || ''
      };

      console.log('Processing payload:', payload);
      navigate('/recommendations', { 
        state: { answers: payload },
        replace: true 
      });
    } catch (error) {
      console.error('Error navigating to recommendations:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleBack = () => {
    navigate(-1);
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
};

export default PreviewAnswers;
