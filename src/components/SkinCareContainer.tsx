import { useState } from 'react';
import { getPersonalizedRecommendations } from '../utils/skinCareRecommendations';
import SkinCarePreferences from './SkinCarePreferences';
import SkinCareResults from './SkinCareResults';
import LoadingSpinner from './LoadingSpinner';
import { ValidationError, validatePreferences, validateProductRecommendations } from '../utils/validation';

const SkinCareContainer = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handlePreferencesSubmit = async (preferences: UserPreferences) => {
    // Clear previous errors
    setErrors([]);

    // Validate preferences
    const validationErrors = validatePreferences(preferences);
    const hasErrors = validationErrors.some(error => error.severity === 'error');

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await getPersonalizedRecommendations(preferences);
      
      if (!response.success) {
        setErrors([
          {
            field: 'system',
            message: response.message || 'Erreur lors de la génération des recommandations',
            type: 'system',
            severity: 'error'
          }
        ]);
        return;
      }

      // Validate recommendations
      const recommendationErrors = validateProductRecommendations(
        response.data.topRecommendations,
        preferences
      );

      // Show warnings but don't block display
      if (recommendationErrors.length > 0) {
        setErrors(recommendationErrors);
      }

      setResults(response.data);
      // Smooth scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      setErrors([
        {
          field: 'system',
          message: 'Une erreur inattendue s\'est produite',
          type: 'system',
          severity: 'error'
        }
      ]);
    }
  };

  // Render errors based on severity
  const renderErrors = () => {
    const errorsByType = {
      error: errors.filter(e => e.severity === 'error'),
      warning: errors.filter(e => e.severity === 'warning')
    };

    return (
      <>
        {errorsByType.error.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <h3 className="font-medium">Veuillez corriger les erreurs suivantes:</h3>
            <ul className="mt-2 list-disc list-inside">
              {errorsByType.error.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        {errorsByType.warning.length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
            <h3 className="font-medium">Attention:</h3>
            <ul className="mt-2 list-disc list-inside">
              {errorsByType.warning.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {renderErrors()}
        {/* Error Alerts - Responsive Design */}
        {generalError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 
                         px-4 py-3 rounded-lg mx-4 sm:mx-0 shadow-sm">
            <p className="text-sm sm:text-base">{generalError}</p>
          </div>
        )}

        {/* Main Content Container */}
        <div className="space-y-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm sm:shadow-md 
                         overflow-hidden transition-shadow duration-300
                         hover:shadow-lg">
            <div className="p-4 sm:p-6 lg:p-8">
              <SkinCarePreferences 
                onSubmit={handlePreferencesSubmit}
                disabled={loading}
              />
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {/* Results Section */}
          {results && !loading && (
            <div id="results" 
                 className="scroll-mt-6 transition-all duration-300 ease-in-out">
              <SkinCareResults {...results} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinCareContainer; 