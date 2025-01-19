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

  useEffect(() => {
    const submitQuizData = async () => {
      try {
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

        const response = await fetch('/openai/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userResponses: quizData }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json().catch(err => {
          throw new Error('Failed to parse response as JSON');
        });

        if (data.success) {
          const parsedRecommendations = parseRecommendations(data.recommendations);
          setRecommendations(parsedRecommendations);
        } else {
          throw new Error(data.message || "An unknown error occurred");
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError("Failed to fetch recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    submitQuizData();
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
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-red-500 text-center text-xl">{error}</p>
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