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
  const [error, setError] = useState<string | null>(null); // Added error state


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
    const MAX_RETRIES = 3;
    let attempt = 0;

    const fetchRecommendations = async () => {
      try {
        if (!validateAnswers()) {
          console.error('Invalid answers state');
          toast.error('Veuillez compléter toutes les questions');
          navigate('/skintypequiz', { replace: true });
          return;
        }

        console.log(`[Attempt ${attempt + 1}/${MAX_RETRIES}] Fetching recommendations with:`, answers);
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch recommendations: ${response.status}`);
        }

        const data = await response.json();

        //Basic response validation.  A schema would be better
        if (!data || !data.recommendations || !data.recommendations.Products || !data.recommendations.Routine) {
          throw new Error('Invalid recommendation data received');
        }

        console.log('API response:', data);
        setRecommendations(data.recommendations);
        setError(null); // Clear error on success
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError(error.message); // Set error message

        if (attempt < MAX_RETRIES) {
          attempt++;
          toast.warning(`Retrying... (${attempt}/${MAX_RETRIES})`);
          setTimeout(fetchRecommendations, 1000 * attempt);
        } else {
          toast.error('Unable to fetch recommendations. Please try again later.');
          setLoading(false);
          navigate('/preview', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();

    return () => {
      console.log('Cleaning up recommendations component');
    };
  }, [answers, navigate]); // Removed validateAnswers dependency

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement de vos recommandations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error: {error}</p>
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