
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
import { generateRoutine } from "@/data/skinRoutines";

// Définition des types pour la routine
type RoutineStep = {
  products: string[];
  instructions?: string;
};

type RoutineTimeConfig = {
  title: string;
  timeOfDay: "morning" | "evening";
  excludeSteps: string[];
  modifySteps: {
    [key: string]: {
      addProducts: string[];
      instructions: string;
    };
  };
};

const Recommendations = () => {
  const { selectedSkinType, selectedConditions } = useSkinType();

  const recommendations = selectedSkinType
    ? getFilteredRecommendations({
        skinType: selectedSkinType,
        conditions: selectedConditions,
      })
    : [];

  const customRoutine = selectedSkinType && selectedConditions.length > 0
    ? generateRoutine(selectedSkinType, selectedConditions)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const routineTypes: RoutineTimeConfig[] = [
    { 
      title: "Routine du Matin",
      timeOfDay: "morning",
      excludeSteps: ["nutrition"],
      modifySteps: {
        protection: {
          addProducts: ["karite-vanille"],
          instructions: "Terminer avec une protection solaire"
        }
      }
    },
    { 
      title: "Routine du Soir", 
      timeOfDay: "evening",
      excludeSteps: [],
      modifySteps: {
        nutrition: {
          addProducts: ["serum-or", "mousseline-kukui"],
          instructions: "Appliquer des soins nourrissants pour la nuit"
        }
      }
    }
  ];

  const getRoutineForTimeOfDay = (
    routine: Record<string, RoutineStep> | null,
    timeOfDay: "morning" | "evening"
  ): Record<string, RoutineStep> => {
    const routineConfig = routineTypes.find(r => r.timeOfDay === timeOfDay);
    if (!routine || !routineConfig) return {};

    const modifiedRoutine = { ...routine };

    routineConfig.excludeSteps?.forEach(step => {
      delete modifiedRoutine[step];
    });

    Object.entries(routineConfig.modifySteps || {}).forEach(([step, config]) => {
      if (modifiedRoutine[step]) {
        modifiedRoutine[step] = {
          ...modifiedRoutine[step],
          products: [...new Set([...modifiedRoutine[step].products, ...config.addProducts])],
          instructions: config.instructions || modifiedRoutine[step].instructions
        };
      } else {
        modifiedRoutine[step] = {
          products: config.addProducts,
          instructions: config.instructions
        };
      }
    });

    return modifiedRoutine;
  };

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

        {/* Section Routine Quotidienne */}
        <section className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-light mb-6 text-gray-800">
            Routine Quotidienne
          </h2>
          {customRoutine && (
            <div className="space-y-8">
              {routineTypes.map(({ title, timeOfDay }) => {
                const routineForTime = getRoutineForTimeOfDay(customRoutine, timeOfDay);
                return (
                  <div key={timeOfDay} className="space-y-4">
                    <h3 className="text-xl font-medium text-gray-700">{title}</h3>
                    <div className="space-y-3">
                      {Object.entries(routineForTime).map(([step, details]) => {
                        if (!details) return null;
                        return (
                          <div
                            key={step}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                          >
                            <h4 className="font-medium text-gray-800 capitalize mb-2">
                              {step.replace(/([A-Z])/g, " $1").trim()}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {details.instructions}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Section Produits Associés */}
        <section className="space-y-6">
          <h2 className="text-2xl font-light tracking-wide text-gray-700 mb-6">
            Produits Recommandés
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((product: Product, index: number) => (
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
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-lg text-gray-900 mb-2">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent 
                      className="max-w-[300px] p-4 text-sm bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg"
                      sideOffset={5}
                    >
                      <div className="space-y-2">
                        <p className="font-playfair text-[#4A4A4A]">
                          {product.ingredients}
                        </p>
                        <p className="text-xs text-gray-500">
                          Texture: {product.texture}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ces recommandations sont basées sur votre profil. N'hésitez pas à nous contacter pour plus de conseils personnalisés.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Recommendations;
