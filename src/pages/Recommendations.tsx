import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { RecommendationResult } from '../types/skincare';
import { toast } from 'sonner';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';

const Recommendations = React.memo(() => {
  console.log('[Recommendations] Rendering');
  const { state, restoreState } = useQuiz();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.group('Recommendations - Component Lifecycle');
    console.log('Component mounted');
    console.log('Initial state:', state);

    const validateState = () => {
      if (!state.skinType || !state.conditions || !state.concerns) {
        if (!restoreState()) {
          toast.error('Données du quiz introuvables');
          navigate('/skintype', { replace: true });
          return false;
        }
      }
      return true;
    };

    if (!validateState()) {
      setLoading(false);
      return;
    }

    return () => {
      console.log('Component unmounting');
      console.groupEnd();
    };
  }, []);

  useEffect(() => {
    let retryCount = 0;
    const MAX_RETRIES = 3;
    
    const fetchRecommendations = async () => {
      try {
        if (!validateAnswers()) {
          console.error('Invalid answers state');
          toast.error('Veuillez compléter toutes les questions');
          navigate('/skintypequiz', { replace: true });
          return;
        }

        console.log('Fetching recommendations with:', answers);
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers)
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch recommendations');
        }

        if (!data.recommendations || !data.recommendations.Products) {
          throw new Error('Invalid recommendation data received');
        }

        console.log('API response:', data);
        setRecommendations(data.recommendations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          toast.warning(`Retrying... (${retryCount}/${MAX_RETRIES})`);
          setTimeout(fetchRecommendations, 1000 * retryCount);
        } else {
          toast.error('Unable to fetch recommendations. Please try again later.');
          setLoading(false);
          navigate('/preview', { replace: true });
        }
      }
    };

    fetchRecommendations();
    
    return () => {
      console.log('Cleaning up recommendations component');
    };
    console.groupEnd();
  }, [answers, navigate, validateAnswers]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement de vos recommandations...</p>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Aucune recommandation trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl font-playfair text-center mb-8">
          Vos Recommandations Personnalisées
        </h1>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl mb-4">Produits Recommandés</h2>
            <div className="space-y-4">
              {recommendations.Products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  {product}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl mb-4">Votre Routine</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-2">Matin</h3>
                <ul className="list-disc pl-6">
                  {recommendations.Routine.Matin.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-2">Soir</h3>
                <ul className="list-disc pl-6">
                  {recommendations.Routine.Soir.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl mb-2">Résultats Attendus</h3>
                <p>{recommendations.Routine.Résultat}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
});

Recommendations.displayName = 'Recommendations';
export default Recommendations;