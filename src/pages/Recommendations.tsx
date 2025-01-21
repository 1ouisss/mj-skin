import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Recommendations = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ type: string; message: string } | null>(null);
  const [recommendations, setRecommendations] = useState({
    products: [],
    routine: ""
  });

  const MAX_RETRIES = 3;
  const INITIAL_DELAY = 1000;

  const getErrorMessage = (status: number, defaultMessage: string) => {
    switch (status) {
      case 404:
        return "Recommendations not found. Please complete all quizzes first.";
      case 401:
        return "Authorization error. Please try logging in again.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
        return "Server error. Our team has been notified.";
      default:
        return defaultMessage;
    }
  };

  const submitQuizDataWithRetry = async (attempt = 1) => {
    try {
      console.group(`Recommendations Component: submitQuizData (Attempt ${attempt})`);
      console.time('request-duration');

      console.log('\n=== Debug: localStorage Raw Values ===');
      const rawValues = {
        skinType: localStorage.getItem('skinType'),
        conditions: localStorage.getItem('conditions'),
        concerns: localStorage.getItem('concerns'),
        zones: localStorage.getItem('zones'),
        treatment: localStorage.getItem('treatment'),
        fragrance: localStorage.getItem('fragrance'),
        routine: localStorage.getItem('routine'),
      };
      console.log('Raw values:', rawValues);

      // Parse JSON strings if needed
      const requestData = Object.fromEntries(
        Object.entries(rawValues).map(([key, value]) => [
          key,
          value ? JSON.parse(value) : null
        ])
      );

      console.log('\n=== Debug: Processed Request Data ===');
      console.log('Processed values:', requestData);

      const payload = {
        ...requestData,
        timestamp: new Date().toISOString(),
        attempt,
        maxRetries: MAX_RETRIES
      };

      console.log('\n=== Debug: Final API Payload ===');
      console.log('Payload sent to API:', JSON.stringify(payload, null, 2));

      // Detailed validation logging
      const emptyFields = Object.entries(requestData)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      console.log('Request Validation:', {
        totalFields: Object.keys(requestData).length,
        filledFields: Object.keys(requestData).length - emptyFields.length,
        emptyFields,
        isValid: emptyFields.length === 0
      });

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
      console.log('Raw localStorage values:', {
        skinType: localStorage.getItem('skinType'),
        conditions: localStorage.getItem('conditions'),
        concerns: localStorage.getItem('concerns'),
        zones: localStorage.getItem('zones'),
        treatment: localStorage.getItem('treatment'),
        fragrance: localStorage.getItem('fragrance'),
        routine: localStorage.getItem('routine'),
      });
      console.log('Quiz data from localStorage:', quizData);

      const missingFields = Object.entries(quizData)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        console.warn('Missing quiz data fields:', missingFields);
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      console.group('API Request Details');
      console.log('Endpoint:', '/api/recommendations');
      console.log('Request payload:', JSON.stringify(quizData, null, 2));
      console.time('API Request Duration');

      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      console.timeEnd('API Request Duration');
      console.log('\n=== Response Details ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', Object.fromEntries([...response.headers]));

      if (!response.ok) {
        const responseClone = response.clone();
        let errorMessage;

        try {
          const errorData = await responseClone.json();
          errorMessage = errorData.message || 'Unknown error occurred';
        } catch {
          errorMessage = await response.text();
        }

        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          message: errorMessage
        });

        if (attempt < MAX_RETRIES) {
          const delay = INITIAL_DELAY * Math.pow(2, attempt - 1);
          console.warn(`Retrying in ${delay}ms... (Attempt ${attempt + 1}/${MAX_RETRIES})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return submitQuizDataWithRetry(attempt + 1);
        }

        throw new Error(getErrorMessage(response.status, errorMessage));
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Data received from backend:', {
        raw: data,
        timestamp: new Date().toISOString(),
        recommendations: data.recommendations,
        success: data.success,
        fields: {
          skinType: data.skinType,
          conditions: data.conditions,
          concerns: data.concerns,
          zones: data.zones,
          treatment: data.treatment,
          fragrance: data.fragrance,
          routine: data.routine
        }
      });

      if (!data.success) {
        throw new Error(data.message || 'Failed to generate recommendations');
      }

      const parsedRecommendations = parseRecommendations(data.recommendations);
      setRecommendations(parsedRecommendations);
      setError(null);

    } catch (error) {
      console.error('Error processing request:', error);
      setError({
        type: error instanceof Error ? error.name : 'UnknownError',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  useEffect(() => {
    const allFieldsPresent = ['skinType', 'conditions', 'concerns', 'zones', 'treatment', 'fragrance', 'routine'].every(
      (key) => !!localStorage.getItem(key)
    );

    if (!allFieldsPresent) {
      setError({
        type: 'ValidationError',
        message: 'Please complete all quizzes before proceeding.'
      });
      setLoading(false);
      return;
    }

    submitQuizDataWithRetry();
  }, []);

  const parseRecommendations = (text: string) => {
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
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#4A4A4A]" />
          <h2 className="text-2xl font-playfair text-[#4A4A4A]">
            Préparation de vos recommandations...
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Veuillez patienter pendant que nous analysons vos réponses
          </p>
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
            <p className="text-gray-800 text-lg">{error.message}</p>
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
              onClick={() => {
                setLoading(true);
                setError(null);
                submitQuizDataWithRetry();
              }} 
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