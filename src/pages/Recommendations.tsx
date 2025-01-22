
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoadingScreen } from '../components/LoadingScreen';
import { QuizAnswers } from '../types/skincare';

export default function Recommendations() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [recommendations, setRecommendations] = React.useState(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getRecommendations = async () => {
      try {
        const storedAnswers = localStorage.getItem('validatedAnswers');
        
        if (!storedAnswers) {
          console.error('No answers found');
          toast.error('Veuillez compléter le quiz');
          navigate('/skintype', { replace: true });
          return;
        }

        const answers = JSON.parse(storedAnswers) as QuizAnswers;
        console.log('Using answers:', answers);

        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers)
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        console.log('Received recommendations:', data);
        setRecommendations(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        toast.error('Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Une erreur est survenue</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-playfair mb-6">Vos Recommandations</h1>
      {recommendations && (
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(recommendations, null, 2)}
        </pre>
      )}
    </div>
  );
}
