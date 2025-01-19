import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Recommendations = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState({
    products: [],
    routine: ""
  });

  const MAX_RETRIES = 3;
  const INITIAL_DELAY = 1000;

  const submitQuizDataWithRetry = async (attempt = 1) => {
    try {
      console.group(`Recommendations Component: submitQuizData (Attempt ${attempt})`);
      // Get quiz data from localStorage
      const quizData = {
        skinType: localStorage.getItem('skinType'),
        conditions: localStorage.getItem('conditions'),
        concerns: localStorage.getItem('concerns'),
        zones: localStorage.getItem('zones'),
        treatment: localStorage.getItem('treatment'),
        fragrance: localStorage.getItem('fragrance'),
        routine: localStorage.getItem('routine')
      };

      console.log('\n=== Submitting Quiz Data ===');
      console.log('Quiz data from localStorage:', quizData);

      // Validate quiz data
      const missingFields = Object.entries(quizData)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        console.warn('Missing quiz data fields:', missingFields);
      }

      console.log('Sending POST request to /openai/analyze');
      console.time('API Request Time');
      const response = await fetch('/openai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userResponses: quizData }),
      });
      console.timeEnd('API Request Time');

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('\n=== Backend Response ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers));
      console.log('Raw response:', responseText);

      if (!response.ok) {
        if (attempt < MAX_RETRIES) {
          const delay = INITIAL_DELAY * Math.pow(2, attempt - 1);
          console.warn(`API request failed (status ${response.status}). Retrying in ${delay}ms...`);
          setTimeout(() => submitQuizDataWithRetry(attempt + 1), delay);
          return;
        } else {
          const errorData = {
            status: response.status,
            statusText: response.statusText,
            body: responseText
          }
          console.error('API request failed repeatedly:', errorData);
          throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
        }
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('\n=== Parsed Response Data ===');
        console.log('Success:', data.success);
        console.log('Recommendations length:', data.recommendations?.length);
        console.log('Full data:', data);
      } catch (err) {
        console.error('JSON parse error:', err);
        throw new Error('Failed to parse response as JSON');
      }

      if (data.success) {
        const parsedRecommendations = parseRecommendations(data.recommendations);
        console.log('Parsed recommendations:', parsedRecommendations);
        setRecommendations(parsedRecommendations);
      } else {
        console.error('Backend indicated failure:', data.message || data.error);
        throw new Error(data.message || data.error || "An unknown error occurred");
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      console.log('\n=== Request Complete ===');
      console.log('Final state:', { loading: false, error: error });
      setLoading(false);
      console.groupEnd();
    }
  };

  useEffect(() => {
    submitQuizDataWithRetry();
  }, []);

  const parseRecommendations = (text) => {
    // Simple parser for demonstration - you may need to adjust based on actual response format
    const sections = text.split('\n\n');
    return {
      products: sections.find(s => s.includes('Recommended Products'))?.split('\n').slice(1) || [],
      routine: sections.find(s => s.includes('Daily Routine')) || ''
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: `url('/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#4A4A4A]" />
          <h2 className="text-2xl font-playfair text-[#4A4A4A]">
            Préparation de vos recommandations...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: `url('/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-2xl font-playfair text-red-600 mb-4">Une erreur s'est produite</h2>
          <div className="space-y-4">
            <p className="text-gray-800 text-lg">{error}</p>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Suggestions:</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Vérifiez votre connexion internet</li>
                <li>Assurez-vous d'avoir complété tous les questionnaires</li>
                <li>Essayez de rafraîchir la page</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Réessayer
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-100 transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 md:py-20"
      style={{
        backgroundImage: `url('/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.section 
          className="results-section mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-12 text-[#4A4A4A] tracking-wide">
            Vos recommandations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {recommendations.products.map((product, index) => (
              <Card 
                key={index}
                className="product-card bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="flex items-center justify-center p-8">
                  <p className="text-lg text-[#4A4A4A] text-center font-playfair">
                    {product}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="routine-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-center mb-12 text-[#4A4A4A] tracking-wide">
            Votre routine recommandée
          </h2>

          <Card className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <div className="whitespace-pre-wrap text-lg text-[#4A4A4A] font-playfair">
                {recommendations.routine}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Recommendations;