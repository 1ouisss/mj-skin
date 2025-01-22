import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { RecommendationResult } from '../types/skincare';
import { toast } from 'sonner';
import { Card, CardContent } from '../components/ui/card';
import { motion } from 'framer-motion';

const Recommendations = React.memo(() => {
  const { state } = useQuiz();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skinType: state.skinType,
            conditions: state.conditions,
            concerns: state.concerns
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data.recommendations);
        setError(null);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
        toast.error('Unable to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [state]);

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
              {recommendations.products.map((product, index) => (
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
                  {recommendations.routine.Matin.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-2">Soir</h3>
                <ul className="list-disc pl-6">
                  {recommendations.routine.Soir.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ul>
              </div>
              {recommendations.routine.Résultat && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-xl mb-2">Résultats Attendus</h3>
                  <p>{recommendations.routine.Résultat}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
});

Recommendations.displayName = 'Recommendations';
export default Recommendations;