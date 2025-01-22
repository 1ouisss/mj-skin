
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
  const { state, restoreState } = useQuiz();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    console.log('Component mounted, current state:', state);

    const validateAndRestoreState = () => {
      if (!state.skinType || !state.conditions || !state.concerns) {
        console.log('[PreviewAnswers] Incomplete state, attempting restoration');
        if (!restoreState()) {
          console.warn('[PreviewAnswers] State restoration failed');
          toast.error('Veuillez compléter le quiz');
          navigate('/skintypequiz', { replace: true });
          return false;
        }
        console.log('[PreviewAnswers] State restored successfully');
      }
      return true;
    };

    if (!validateAndRestoreState()) {
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [state, navigate, restoreState]);

  const navigateToRecommendations = () => {
    if (!state || !state.skinType || !state.conditions || !state.concerns) {
      toast.error('Veuillez compléter le quiz');
      return;
    }

    try {
      localStorage.setItem('validatedAnswers', JSON.stringify(state));
      navigate('/recommendations');
    } catch (error) {
      console.error('Error storing answers:', error);
      toast.error('Une erreur est survenue');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-lg">Chargement de vos réponses...</p>
      </div>
    );
  }

  if (!state || !state.skinType || !state.conditions || !state.concerns) {
    return <Navigate to="/skintypequiz" replace />;
  }

  const questionsMap = {
    'Type de peau': state.skinType,
    'Condition': state.conditions,
    'Préoccupation': state.concerns,
    'Texture préférée': state.texturePreference || 'Non spécifié',
    'Parfum préféré': state.scentPreference || 'Non spécifié'
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
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Modifier
              </Button>
              <Button
                onClick={navigateToRecommendations}
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
