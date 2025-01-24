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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state || !state.skinType) {
      toast.error('Veuillez compléter le questionnaire');
      navigate('/', { replace: true });
      return;
    }
    setLoading(false);
  }, [state, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-xl font-semibold text-red-600">Erreur</h2>
            <p className="text-gray-600">{error}</p>
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen w-full p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/lovable-uploads/16a7cd5d-3c28-4346-a540-6de1d525a480.png")' }}
    >
      <div className="max-w-4xl mx-auto">
        <Card className="w-full bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-playfair text-center">
              Vos Recommandations Personnalisées
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Résultats de l'Analyse</h2>
              <div className="bg-gray-50/80 p-4 rounded-lg">
                <p>Type de peau: {state.skinType}</p>
                {state.conditions && <p>Condition: {state.conditions}</p>}
                {state.concerns && <p>Préoccupations: {state.concerns}</p>}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Produit Recommandé</h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 bg-gray-50/80 rounded-lg text-center"
              >
                <p className="text-lg font-playfair">Votre produit s'affiche ici</p>
              </motion.div>
            </section>

            <div className="flex justify-center pt-6">
              <Button onClick={() => navigate('/')}>
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Recommendations;