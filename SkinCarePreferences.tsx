import { useState, FormEvent } from 'react';
import { submitPreferences } from '../api/skinCareApi';

interface SkinCarePreferences {
  skinType: string;
  condition: string[];
  concerns: string[];
  texturePreference: string;
  scentPreference: string;
}

const SkinCarePreferences = () => {
  const [preferences, setPreferences] = useState<SkinCarePreferences>({
    skinType: '',
    condition: [],
    concerns: [],
    texturePreference: '',
    scentPreference: '',
  });

  const skinTypes = ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'];
  const skinConditions = ['Acne-Prone', 'Dehydrated', 'Mature', 'Rosacea', 'Eczema'];
  const skinConcerns = ['Anti-aging', 'Brightening', 'Pores', 'Dark spots', 'Texture'];
  const textures = ['Light', 'Rich', 'Gel', 'Cream', 'Oil'];
  const scents = ['Unscented', 'Floral', 'Fresh', 'Herbal', 'Citrus'];

  const handleConditionChange = (condition: string) => {
    setPreferences(prev => ({
      ...prev,
      condition: prev.condition.includes(condition)
        ? prev.condition.filter(c => c !== condition)
        : [...prev.condition, condition]
    }));
  };

  const handleConcernChange = (concern: string) => {
    setPreferences(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await submitPreferences(preferences);
      if (result.success) {
        console.log('Recommendations:', result.data);
        // Add state handling for recommendations display
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Skincare Preferences
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Skin Type */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Skin Type
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skinTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, skinType: type })}
                  className={`px-4 py-2 rounded-lg border ${
                    preferences.skinType === type
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Conditions */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Skin Conditions (Select multiple)
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skinConditions.map((condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => handleConditionChange(condition)}
                  className={`px-4 py-2 rounded-lg border ${
                    preferences.condition.includes(condition)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Concerns */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Skin Concerns (Select multiple)
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skinConcerns.map((concern) => (
                <button
                  key={concern}
                  type="button"
                  onClick={() => handleConcernChange(concern)}
                  className={`px-4 py-2 rounded-lg border ${
                    preferences.concerns.includes(concern)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>

          {/* Texture Preference */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Texture Preference
            </label>
            <select
              value={preferences.texturePreference}
              onChange={(e) => setPreferences({ ...preferences, texturePreference: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="">Select texture</option>
              {textures.map((texture) => (
                <option key={texture} value={texture}>
                  {texture}
                </option>
              ))}
            </select>
          </div>

          {/* Scent Preference */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Scent Preference
            </label>
            <select
              value={preferences.scentPreference}
              onChange={(e) => setPreferences({ ...preferences, scentPreference: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="">Select scent</option>
              {scents.map((scent) => (
                <option key={scent} value={scent}>
                  {scent}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
                     transition duration-200 ease-in-out font-semibold"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkinCarePreferences; 