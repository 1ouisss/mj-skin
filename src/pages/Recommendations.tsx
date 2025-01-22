import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [routine, setRoutine] = useState(null);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async (inputs) => {
    try {
      setIsRequestInProgress(true);
      setError(null);
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.recommendations) {
          setProducts(data.recommendations.Products);
          setRoutine(data.recommendations.Routine);
        } else {
          setError(data.message || "No recommendations found");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error fetching recommendations");
      }
    } catch (error) {
      setError("Error fetching recommendations: " + (error.message || error));
    } finally {
      setIsRequestInProgress(false);
    }
  };

  useEffect(() => {
    const inputs = {
      skinType: localStorage.getItem('skinType') || "",
      condition: localStorage.getItem('conditions') || "",
      concern: localStorage.getItem('concerns') || "",
      texturePreference: localStorage.getItem('texturePreference') || "",
      scentPreference: localStorage.getItem('scentPreference') || "",
    };
    fetchRecommendations(inputs);
  }, []);

  if (isRequestInProgress) {
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
          <p className="text-gray-800">{error}</p>
          <div className="mt-6 flex gap-4">
            <button 
              onClick={() => {
                setProducts([]);
                setRoutine(null);
                fetchRecommendations({});
              }} 
              className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Réessayer
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
            {products.map((product, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
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

        {routine && (
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
                <div className="space-y-6 text-[#4A4A4A] font-playfair">
                  <div>
                    <h3 className="text-2xl mb-4">Matin</h3>
                    <ul className="space-y-2">
                      {routine.Matin.map((step, index) => (
                        <li key={index} className="text-lg">{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl mb-4">Soir</h3>
                    <ul className="space-y-2">
                      {routine.Soir.map((step, index) => (
                        <li key={index} className="text-lg">{step}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-lg italic mt-6">{routine.Résultat}</p>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Recommendations;