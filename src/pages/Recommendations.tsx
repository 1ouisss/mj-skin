import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import skinCareData from '@/data/skincare-db.json';

export default function Recommendations() {
  const { state } = useQuiz();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!state.skinType) {
      toast.error('Veuillez compléter toutes les questions requises');
      navigate('/skintypequiz');
      return;
    }
  }, [state, navigate]);

  const getRecommendations = () => {
    // Try finding by skin type first
    let recommendations = skinCareData.SkinType?.[state.skinType];

    // If not found, try conditions
    if (!recommendations && state.conditions) {
      recommendations = skinCareData.Condition?.[state.conditions];
    }

    // Finally try concerns
    if (!recommendations && state.concerns) {
      recommendations = skinCareData.Concerns?.[state.concerns];
    }

    return recommendations || null;
  };

  const recommendations = getRecommendations();

  if (!recommendations) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Aucune recommandation trouvée</h1>
        <Button onClick={() => navigate('/')}>Recommencer</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Vos Recommandations Personnalisées</h1>

      <div className="w-full max-w-2xl space-y-6">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Produits Recommandés</h2>
          <ul className="list-disc pl-6 space-y-2">
            {recommendations.Products && Object.entries(recommendations.Products).map(([key, value]) => (
              <li key={key}>{key}: {value as string}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Votre Routine</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Matin ☀️</h3>
              <p>{recommendations.Routine?.Matin}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Soir 🌙</h3>
              <p>{recommendations.Routine?.Soir}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">Résultat attendu ✨</h3>
              <p>{recommendations.Routine?.["Résultat attendu"]}</p>
            </div>
          </div>
        </section>
      </div>

      <Button className="mt-8" onClick={() => navigate('/')}>
        Retour à l'accueil
      </Button>
    </div>
  );
}