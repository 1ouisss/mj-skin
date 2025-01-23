
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
  const { answers, completed } = useQuiz();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!completed) {
      toast.error('Please complete the quiz first');
      navigate('/');
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const searchParams = new URLSearchParams({
          skinType: answers.skinType || '',
          condition: answers.condition || '',
          concerns: answers.concerns || ''
        });

        const response = await fetch(`/recommendations?${searchParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Recommendation fetch error:', error);
        toast.error('Unable to load recommendations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [completed, answers, navigate]);

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
          {recommendations?.Products && (
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

          {recommendations?.Routine && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Votre Routine</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Matin ☀️</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {recommendations.Routine.Matin.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Soir 🌙</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {recommendations.Routine.Soir.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
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
