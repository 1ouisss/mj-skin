import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoadingScreen } from '../components/LoadingScreen';
import { QuizAnswers } from '../types/skincare';

export default function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [hasRedirected, setHasRedirected] = React.useState(false);

  React.useEffect(() => {
    const validateAndInitialize = async () => {
      try {
        const storedAnswers = localStorage.getItem('validatedAnswers');
        if (!storedAnswers && !location.state?.answers && !hasRedirected) {
          setHasRedirected(true);
          toast.error('Veuillez compléter le quiz');
          navigate('/skintype', { replace: true });
          return;
        }

        const answers = location.state?.answers || JSON.parse(storedAnswers as string);

        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers)
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        console.log('Recommendations:', data);

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Une erreur est survenue');
        if (!hasRedirected) {
          setHasRedirected(true);
          navigate('/skintype', { replace: true });
        }
      }
    };

    validateAndInitialize();
  }, [location.state, navigate, hasRedirected]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      <h1>Recommendations</h1>
      {/* Add your recommendations UI here */}
    </div>
  );
}