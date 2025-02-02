import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { getFilteredRecommendations } from "@/services/recommendationService";
import { useSkinType } from "@/contexts/SkinTypeContext";
import { Product } from "@/types/skincare";

const Recommendations = () => {
  const { selectedSkinType, selectedConditions, selectedTextures } = useSkinType();

  const recommendations = selectedSkinType
    ? getFilteredRecommendations({
        skinType: selectedSkinType,
        conditions: selectedConditions,
        duration: "5-10 minutes",
        textures: selectedTextures,
        noEssentialOils: false,
      })
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const routineTypes = [
    { title: "Routine du Matin", timeOfDay: "morning" },
    { title: "Routine du Soir", timeOfDay: "evening" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-4 md:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-light tracking-wide text-gray-800 mb-8">
          Votre Routine Personnalisée
        </h1>

        {routineTypes.map(({ title, timeOfDay }) => (
          <section key={timeOfDay} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-700 mb-6">
              {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations
                .filter(
                  (product) =>
                    product.timeOfDay === timeOfDay ||
                    product.timeOfDay === "both"
                )
                .map((product: Product, index: number) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-0">
                              <div className="aspect-square relative">
                                <img
                                  src={product.url}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4 space-y-2">
                                <h3 className="font-medium text-lg text-gray-900">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {product.type}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="max-w-[300px] p-4 text-sm bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg"
                          sideOffset={5}
                        >
                          <p className="font-playfair text-[#4A4A4A]">{product.ingredients}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
            </div>
          </section>
        ))}

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cette routine a été spécialement conçue pour votre type de peau{" "}
            {selectedSkinType}. Pour des résultats optimaux, suivez l'ordre des
            produits tel qu'indiqué.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Recommendations;