
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Waves, Eye, Circle, Sun, Heart, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ProgressHeader from "@/components/ProgressHeader";
import { useSkinType } from "@/contexts/SkinTypeContext";
import { Button } from "@/components/ui/button";
import { SkinCondition } from "@/types/skincare";

const ConcernsQuiz = () => {
  const navigate = useNavigate();
  const { selectedConditions, setSelectedConditions } = useSkinType();

  const handleOptionToggle = (condition: SkinCondition) => {
    if (condition === "Aucune") {
      setSelectedConditions(["Aucune"]);
      return;
    }

    const newConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter(c => c !== condition && c !== "Aucune")
      : [...selectedConditions.filter(c => c !== "Aucune"), condition];
    
    setSelectedConditions(newConditions);
  };

  const handleNext = () => {
    navigate("/treatment-quiz");
  };

  const concerns = [
    { text: "Rides" as SkinCondition, icon: Waves },
    { text: "Cernes" as SkinCondition, icon: Eye },
    { text: "Acné" as SkinCondition, icon: Circle },
    { text: "Taches" as SkinCondition, icon: Sun },
    { text: "Rougeurs" as SkinCondition, icon: Heart },
    { text: "Aucune" as SkinCondition, icon: Sparkles },
  ];

  return (
    <div 
      className="flex items-center justify-center px-4 min-h-screen w-full relative"
      style={{
        background: `url('/lovable-uploads/fb3ff92a-8049-4229-b2ce-8e9a41f262f1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ProgressHeader currentStep={3} />
      
      <div className="w-full max-w-2xl mx-auto relative z-10 p-12 bg-white/95 backdrop-blur-sm rounded-[32px] shadow-lg">
        <div className="space-y-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center space-y-4 mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-light text-gray-900">
              Quelles sont vos principales préoccupations ?
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Sélectionnez une ou plusieurs préoccupations
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {concerns.map((option, index) => (
              <motion.div
                key={option.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white hover:bg-gray-50 rounded-2xl p-6 
                          shadow-sm transition-all duration-300 
                          border border-gray-100"
              >
                <label
                  htmlFor={option.text}
                  className="flex items-center gap-6 cursor-pointer w-full"
                >
                  <Checkbox
                    checked={selectedConditions.includes(option.text)}
                    onCheckedChange={() => handleOptionToggle(option.text)}
                    id={option.text}
                    className="w-5 h-5 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900"
                  />
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
              onClick={handleNext}
              className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-3 rounded-full text-lg font-light"
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

export default ConcernsQuiz;
