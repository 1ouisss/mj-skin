
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Flower2, Heart, Check } from "lucide-react";
import ProgressHeader from "@/components/ProgressHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { useSkinType } from "@/contexts/SkinTypeContext";
import { SkinCondition } from "@/types/skincare";
import { Button } from "@/components/ui/button";

const conditions = [
  { value: "Acné" as SkinCondition, text: "Acné", icon: Sparkles },
  { value: "Eczéma" as SkinCondition, text: "Eczéma", icon: Flower2 },
  { value: "Rougeurs" as SkinCondition, text: "Rougeurs", icon: Heart },
  { value: "Aucune" as SkinCondition, text: "Aucune", icon: Check },
];

const ConditionsQuiz = () => {
  const navigate = useNavigate();
  const { selectedConditions, setSelectedConditions } = useSkinType();

  const handleConditionToggle = (condition: SkinCondition) => {
    if (condition === "Aucune") {
      setSelectedConditions(["Aucune"]);
      return;
    }

    const newConditions = selectedConditions.filter(c => c !== "Aucune");
    if (newConditions.includes(condition)) {
      setSelectedConditions(newConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...newConditions, condition]);
    }
  };

  const handleContinue = () => {
    if (selectedConditions.length > 0) {
      navigate("/concerns-quiz");
    }
  };

  return (
    <div 
      className="flex items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/ada41ff7-d054-4869-8e8a-8138b7c1aa81.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProgressHeader currentStep={2} />
      
      <div className="w-full max-w-4xl mx-auto relative z-10 p-12 bg-white/90 backdrop-blur-sm rounded-[32px] shadow-lg">
        <div className="space-y-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center space-y-4 mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-light text-gray-900">
              Quelles sont vos principales conditions ?
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Sélectionnez une ou plusieurs conditions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {conditions.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-white hover:bg-gray-50 
                          rounded-xl p-6 shadow-sm transition-all duration-300 
                          group border border-gray-100"
                style={{ minHeight: '80px' }}
              >
                <Checkbox
                  checked={selectedConditions.includes(option.value)}
                  onCheckedChange={() => handleConditionToggle(option.value)}
                  id={option.value}
                  className="data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                />
                <label
                  htmlFor={option.value}
                  className="flex items-center gap-4 flex-1 cursor-pointer"
                >
                  <option.icon className="w-5 h-5 stroke-[1.5] text-gray-700" />
                  <span className="text-lg font-playfair">{option.text}</span>
                </label>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={handleContinue}
              className="bg-gray-700 hover:bg-gray-600 text-white px-12 py-3 rounded-full text-lg font-light"
              disabled={selectedConditions.length === 0}
            >
              Suivant
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsQuiz;
