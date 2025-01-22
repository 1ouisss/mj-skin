
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { toast } from 'sonner';
import { QuizAnswers, RecommendationResult } from '../types/skincare';

export default function Recommendations() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const answers = location.state?.answers as QuizAnswers | undefined;

  useEffect(() => {
    console.group('Recommendations Component');
    console.log('Received state:', location.state);
    console.log('Parsed answers:', answers);

    if (!answers) {
      console.error('No answers received in Recommendations');
      setError('No quiz answers found');
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);
        setRecommendations(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch recommendations');
        toast.error('Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
    console.groupEnd();
  }, [answers]);

  if (!answers) {
    toast.error('Veuillez compléter le quiz');
    return <Navigate to="/skintype" replace />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl text-red-500 mb-4">Une erreur est survenue</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl mb-4">Aucune recommandation trouvée</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-playfair mb-6">Vos Recommandations</h1>
      <div className="space-y-6">
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
          {JSON.stringify(recommendations, null, 2)}
        </pre>
      </div>
    </div>
  );
}
