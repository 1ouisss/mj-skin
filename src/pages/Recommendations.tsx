
import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { RecommendationResult } from '../types/skincare';

const Recommendations = () => {
  const { state } = useQuiz();
  const { answers, completed } = state;
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!completed || !answers.skinType) {
      toast.error('Please complete the quiz first');
      navigate('/', { replace: true });
      return;
    }
  }, [completed, answers, navigate]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!completed || !answers.skinType) {
        navigate('/');
        return;
      }

      try {
        const params = new URLSearchParams({
          skinType: answers.skinType,
          condition: answers.condition || '',
          concerns: answers.concerns || ''
        });

        const response = await fetch(`/api/recommendations?${params}`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');

        const data = await response.json();
        console.log('Received recommendations:', data);
        setRecommendations(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Unable to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [answers, completed, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen w-full p-4 max-w-4xl mx-auto"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-playfair text-center">
            Vos Recommandations Personnalisées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendations && (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Résultats de l'Analyse</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>Type de peau: {answers.skinType}</p>
                  {answers.condition && <p>Condition: {answers.condition}</p>}
                  {answers.concerns && <p>Préoccupations: {answers.concerns}</p>}
                </div>
              </section>

              {recommendations.Products && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Produits Recommandés</h2>
                  <ul className="space-y-4">
                    {recommendations.Products.map((product, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        {product}
                      </motion.li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}

          <div className="flex justify-center pt-6">
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Recommendations;
