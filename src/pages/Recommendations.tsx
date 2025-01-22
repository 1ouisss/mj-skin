import React, { useState } from "react";
import { getRecommendations } from "../utils/recommendations";

const Recommendations = () => {
  const [inputs, setInputs] = useState({
    skinType: "",
    condition: "",
    concern: "",
    texturePreference: "",
    scentPreference: ""
  });

  const [recommendation, setRecommendation] = useState(null);

  const handleRecommendation = () => {
    const result = getRecommendations(
      inputs.skinType,
      inputs.condition,
      inputs.concern,
      inputs.texturePreference,
      inputs.scentPreference
    );
    setRecommendation(result);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 md:py-20"
      style={{
        backgroundImage: `url('/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="w-full max-w-7xl mx-auto">
        <h1>Vos Recommandations</h1>
        <div>
          {/* Input Fields */}
          <label className="block mb-2">
            Type de peau:
            <input className="border border-gray-300 rounded px-3 py-2 w-full" value={inputs.skinType} onChange={(e) => setInputs({ ...inputs, skinType: e.target.value })} />
          </label>
          <label className="block mb-2">
            Condition:
            <input className="border border-gray-300 rounded px-3 py-2 w-full" value={inputs.condition} onChange={(e) => setInputs({ ...inputs, condition: e.target.value })} />
          </label>
          <label className="block mb-2">
            Préoccupation:
            <input className="border border-gray-300 rounded px-3 py-2 w-full" value={inputs.concern} onChange={(e) => setInputs({ ...inputs, concern: e.target.value })} />
          </label>
          <label className="block mb-2">
            Préférence de texture:
            <input className="border border-gray-300 rounded px-3 py-2 w-full" value={inputs.texturePreference} onChange={(e) => setInputs({ ...inputs, texturePreference: e.target.value })} />
          </label>
          <label className="block mb-4">
            Préférence de parfum:
            <input className="border border-gray-300 rounded px-3 py-2 w-full" value={inputs.scentPreference} onChange={(e) => setInputs({ ...inputs, scentPreference: e.target.value })} />
          </label>
          <button onClick={handleRecommendation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voir les recommandations</button>
        </div>

        {/* Display Recommendations */}
        {recommendation && (
          <>
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
                {recommendation.Products?.map((product, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-center p-8">
                      <p className="text-lg text-[#4A4A4A] text-center font-playfair">
                        {product}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            {recommendation.Routine && (
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
                          {recommendation.Routine.Matin?.map((step, index) => (
                            <li key={index} className="text-lg">{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-2xl mb-4">Soir</h3>
                        <ul className="space-y-2">
                          {recommendation.Routine.Soir?.map((step, index) => (
                            <li key={index} className="text-lg">{step}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-lg italic mt-6">{recommendation.Routine.Résultat}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendations;