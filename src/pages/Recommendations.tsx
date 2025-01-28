import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { getFilteredRecommendations } from "@/services/recommendationService";
import { routineRecommendations } from "@/data/routines";
import { Sparkles, Sun, Moon, Star } from "lucide-react";
import { useSkinType } from "@/contexts/SkinTypeContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Recommendations = () => {
  const { selectedSkinType, selectedCondition } = useSkinType();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedSkinType) {
      navigate("/skin-type-quiz");
    }
  }, [selectedSkinType, navigate]);

  if (!selectedSkinType) return null;

  const recommendation = routineRecommendations[selectedSkinType];
  const filteredProducts = getFilteredRecommendations(
    selectedSkinType,
    selectedCondition || "Aucune",
    "< 5 minutes", // You might want to get this from context
    "Légère", // You might want to get this from context
    false // You might want to get this from context
  );

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-8 md:py-12"
      style={{
        background: `url('/lovable-uploads/a33d5244-470c-46e4-aedc-b08a04f5ecbb.png')`,
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
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-playfair text-center mb-6 text-[#4A4A4A] tracking-wide">
            Recommandations
          </h1>

          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-3xl font-playfair text-center text-[#4A4A4A] flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Produits recommandés
              </h2>
              <span className="text-sm text-[#666666] italic">
                (Survolez pour voir les ingrédients et le lien du produit)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
              {filteredProducts.map((product, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <CardContent className="flex items-center justify-center p-8 h-32">
                          <a 
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-[#4A4A4A] text-center font-playfair hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {product.name}
                          </a>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px] p-4 text-sm">
                      <p className="font-playfair">{product.ingredients}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair text-[#4A4A4A] mb-4 flex items-center gap-2">
                  <Sun className="w-6 h-6" />
                  Routine du matin
                </h3>
                <p className="text-lg text-[#666666] leading-relaxed font-playfair">
                  {recommendation.morningRoutine}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair text-[#4A4A4A] mb-4 flex items-center gap-2">
                  <Moon className="w-6 h-6" />
                  Routine du soir
                </h3>
                <p className="text-lg text-[#666666] leading-relaxed font-playfair">
                  {recommendation.eveningRoutine}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-playfair text-[#4A4A4A] mb-4 flex items-center justify-center gap-2">
                <Star className="w-6 h-6" />
                Résultats attendus
              </h3>
              <p className="text-xl text-[#666666] text-center font-playfair">
                {recommendation.results}
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Recommendations;
