import { useState, FormEvent } from 'react';
import { submitPreferences } from '../api/skinCareApi';
import { SkinCareProduct } from '../utils/skinCareRecommendations';

interface RecommendationResults {
  morningRoutine: SkinCareProduct[];
  eveningRoutine: SkinCareProduct[];
  topRecommendations: SkinCareProduct[];
  morningSteps: string[];
  eveningSteps: string[];
}

const SkinCareAdvisor = () => {
  const [preferences, setPreferences] = useState({
    skinType: '',
    condition: [] as string[],
    concerns: [] as string[],
    texturePreference: '',
    scentPreference: '',
  });

  const [results, setResults] = useState<RecommendationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Your existing options arrays
  const skinTypes = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];
  const skinConditions = ['Acne-Prone', 'Dehydrated', 'Mature', 'Rosacea', 'Eczema'];
  const skinConcerns = ['Anti-aging', 'Brightening', 'Pores', 'Dark spots', 'Texture'];
  const textures = ['Light', 'Rich', 'Gel', 'Cream', 'Oil'];
  const scents = ['Unscented', 'Floral', 'Fresh', 'Herbal', 'Citrus'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await submitPreferences(preferences);
      if (response.success) {
        setResults(response.data);
        // Smooth scroll to results
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ResultsSection = () => {
    if (!results) return null;

    return (
      <div id="results" className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Your Personalized Skincare Routine
        </h2>

        {/* Morning Routine */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            Morning Routine ☀️
          </h3>
          <div className="space-y-3">
            {results.morningSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3"
              >
                <span className="text-blue-500 font-medium">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evening Routine */}
        <div className="bg-indigo-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-indigo-900 mb-4">
            Evening Routine 🌙
          </h3>
          <div className="space-y-3">
            {results.eveningSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-3"
              >
                <span className="text-indigo-500 font-medium">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recommendations */}
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-4">
            Top Recommended Products 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.topRecommendations.map((product) => (
              <div 
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-gray-600 text-sm">{product.type}</p>
                <p className="text-green-600 font-medium mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Personalized Skincare Advisor
          </h1>

          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Your existing form fields here */}
            {/* ... */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg 
                       transition duration-200 ease-in-out font-semibold
                       ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {loading ? 'Generating Recommendations...' : 'Get Personalized Recommendations'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <ResultsSection />
      </div>
    </div>
  );
};

export default SkinCareAdvisor; 