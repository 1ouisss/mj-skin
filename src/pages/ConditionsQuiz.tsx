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
        backgroundSize: '150%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >
      <ProgressHeader currentStep={2} />
      
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-title text-4xl md:text-5xl font-light tracking-wider leading-tight text-center mb-12"
          >
            Quelles sont vos principales conditions ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {conditions.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-white/90 backdrop-blur-sm hover:bg-white text-[#222222] rounded-full py-4 px-6 transition-colors"
              >
                <Checkbox
                  checked={selectedConditions.includes(option.value)}
                  onCheckedChange={() => handleConditionToggle(option.value)}
                  id={option.value}
                />
                <label
                  htmlFor={option.value}
                  className="flex items-center gap-4 flex-1 cursor-pointer"
                >
                  <option.icon className="w-6 h-6 stroke-[1.5]" />
                  <span className="text-lg">{option.text}</span>
                </label>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={handleContinue}
              className="bg-white/90 text-[#222222] hover:bg-white px-8 py-2 rounded-full"
              disabled={selectedConditions.length === 0}
            >
              Continuer
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsQuiz;