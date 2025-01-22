
import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRecommendations } from '@/utils/recommendations';

export default function Recommendations() {
  const { state } = useQuiz();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!state.skinType || !state.conditions || !state.concerns) {
      navigate('/skintypequiz');
      return;
    }
  }, [state, navigate]);

  const recommendations = getRecommendations(
    state.skinType,
    state.conditions,
    state.concerns
  );

  if (!recommendations) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Aucune recommandation trouvée</h2>
          <Button onClick={() => navigate('/')}>Recommencer</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl space-y-6"
      >
        <h1 className="text-4xl font-playfair text-center mb-8">
          Vos Recommandations Personnalisées
        </h1>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Produits Recommandés</h2>
            <ul className="list-disc pl-6 space-y-2">
              {recommendations.Products.map((product, index) => (
                <li key={index} className="text-gray-700">{product}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Votre Routine</h2>
            <div className="space-y-4">
              {recommendations.Routine && (
                <>
                  <div>
                    <h3 className="font-medium mb-2">Matin ☀️</h3>
                    <ul className="list-disc pl-6">
                      {recommendations.Routine.Matin.map((step, index) => (
                        <li key={index} className="text-gray-700">{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Soir 🌙</h3>
                    <ul className="list-disc pl-6">
                      {recommendations.Routine.Soir.map((step, index) => (
                        <li key={index} className="text-gray-700">{step}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={() => navigate('/')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
