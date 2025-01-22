import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { QuizAnswers } from '../types/skincare';
import { useQuiz } from '../context/QuizContext';

export default function PreviewAnswers() {
  const navigate = useNavigate();
  const { state } = useQuiz();
  const [answers, setAnswers] = React.useState<QuizAnswers | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    console.group('PreviewAnswers Debug');
    console.log('Component mounted');
    console.log('QuizContext state:', state);

    try {
      const storedAnswers = localStorage.getItem('quizAnswers');
      console.log('Raw stored answers:', storedAnswers);

      if (!storedAnswers) {
        console.error('No answers found in localStorage');
        toast.error('Veuillez compléter le quiz');
        navigate('/skintype', { replace: true });
        return;
      }

      const parsedAnswers = JSON.parse(storedAnswers);
      console.log('Parsed answers:', parsedAnswers);

      if (!parsedAnswers.skinType || !parsedAnswers.conditions || !parsedAnswers.concerns) {
        console.error('Missing required fields:', {
          skinType: parsedAnswers.skinType,
          conditions: parsedAnswers.conditions,
          concerns: parsedAnswers.concerns
        });
        toast.error('Réponses incomplètes');
        navigate('/skintype', { replace: true });
        return;
      }

      setAnswers(parsedAnswers);
    } catch (error) {
      console.error('Error processing answers:', error);
      toast.error('Une erreur est survenue');
      navigate('/skintype', { replace: true });
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  }, [navigate, state]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-lg">Chargement de vos réponses...</p>
      </div>
    );
  }

  if (!answers) {
    return <Navigate to="/skintype" replace />;
  }

  const questionsMap = {
    'Type de peau': answers.skinType || 'Non spécifié',
    'Condition': answers.conditions || 'Non spécifié',
    'Préoccupation': answers.concerns || 'Non spécifié',
    'Texture préférée': answers.texturePreference || 'Non spécifié',
    'Parfum préféré': answers.scentPreference || 'Non spécifié'
  };

  console.log('Rendering preview with answers:', questionsMap);

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
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Modifier
              </Button>
              <Button
                onClick={() => navigate('/recommendations')}
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