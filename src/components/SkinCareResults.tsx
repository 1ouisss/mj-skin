import { SkinCareProduct } from '../utils/skinCareRecommendations';
import { useState } from 'react';

interface ResultsProps {
  morningRoutine: SkinCareProduct[];
  eveningRoutine: SkinCareProduct[];
  topRecommendations: SkinCareProduct[];
}

interface ErrorState {
  field: string;
  message: string;
  type: 'validation' | 'system' | 'data';
}

const [errors, setErrors] = useState<ErrorState[]>([]);

const handleError = (error: ErrorState) => {
  setErrors(prev => [...prev, error]);
  
  // Clear error after 5 seconds
  setTimeout(() => {
    setErrors(prev => prev.filter(e => e !== error));
  }, 5000);
};

const SkinCareResults = ({ morningRoutine, eveningRoutine, topRecommendations }: ResultsProps) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Products Section */}
      <section className="bg-white rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 
                     flex items-center gap-2">
          Produits Recommandés ✨
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {topRecommendations.slice(0, 3).map((product) => (
            <div key={product.id}
                 className="bg-gray-50 rounded-lg p-4 hover:shadow-md 
                          transition-all duration-300 ease-in-out
                          transform hover:-translate-y-1">
              <div className="flex flex-col h-full">
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.type}
                </p>
                <div className="mt-auto pt-2 border-t border-gray-200">
                  <span className="text-blue-600 font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Routines Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Morning Routine */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 
                          rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 
                       flex items-center gap-2">
            Routine Matin ☀️
          </h3>
          <div className="space-y-3">
            {morningRoutine.map((product, index) => (
              <div key={product.id}
                   className="bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 
                            shadow-sm flex items-start gap-3 sm:gap-4
                            hover:shadow-md transition-shadow duration-300">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 
                               bg-yellow-100 rounded-full flex items-center 
                               justify-center text-yellow-700 font-medium
                               text-sm sm:text-base">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    {product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {product.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evening Routine - Similar structure to Morning Routine */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 
                          rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 
                       flex items-center gap-2">
            Routine Soir 🌙
          </h3>
          <div className="space-y-3">
            {eveningRoutine.map((product, index) => (
              <div key={product.id}
                   className="bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 
                            shadow-sm flex items-start gap-3 sm:gap-4
                            hover:shadow-md transition-shadow duration-300">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 
                               bg-indigo-100 rounded-full flex items-center 
                               justify-center text-indigo-700 font-medium
                               text-sm sm:text-base">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    {product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {product.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tips Section */}
      <section className="bg-white rounded-xl shadow-sm sm:shadow-md 
                         p-4 sm:p-6 lg:p-8">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 
                     flex items-center gap-2">
          Conseils Supplémentaires 💡
        </h3>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="flex-1">
              Appliquez les produits du plus léger au plus épais
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="flex-1">
              Attendez 1-2 minutes entre chaque produit
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="flex-1">
              N'oubliez pas la protection solaire le matin
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SkinCareResults; 