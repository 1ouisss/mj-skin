import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (!storedAnswers) {
      toast.error('Veuillez compléter le quiz');
      navigate('/skintype', { replace: true });
      return;
    }
    try {
      const parsedAnswers = JSON.parse(storedAnswers);
      setAnswers(parsedAnswers);
      console.log('Loaded answers:', parsedAnswers);
    } catch (error) {
      console.error('Error parsing answers:', error);
      toast.error('Une erreur est survenue');
      navigate('/skintype', { replace: true });
    }
  }, [navigate]);

  const handleSeeRecommendations = () => {
    if (!answers) {
      toast.error('Veuillez compléter le quiz');
      return;
    }
    console.log('Storing validated answers:', answers);
    localStorage.setItem('validatedAnswers', JSON.stringify(answers));
    navigate('/recommendations', { replace: true });
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
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <motion.div className="w-full max-w-2xl">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-4xl font-playfair text-center mb-8">
              Confirmez vos réponses
            </h2>
            <div className="space-y-4 mb-8">
              {Object.entries(questionsMap).map(([question, answer], index) => (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 rounded-lg bg-gray-50"
                >
                  <span className="font-medium">{question}</span>
                  <span className="text-gray-600">{answer}</span>
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
                className="flex items-center gap-2"
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