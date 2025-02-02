import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Waves, 
  Eye, 
  Circle, 
  Sun, 
  Heart, 
  Zap, 
  Sparkles, 
  Search, 
  ArrowDown 
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import ProgressHeader from "@/components/ProgressHeader";
import { useSkinType } from "@/contexts/SkinTypeContext";
import { Button } from "@/components/ui/button";
import { SkinCondition } from "@/types/skincare";

const ConcernsQuiz = () => {
  const navigate = useNavigate();
  const { selectedConditions, setSelectedConditions } = useSkinType();

  const handleOptionToggle = (condition: SkinCondition) => {
    const newConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter(c => c !== condition)
      : [...selectedConditions, condition];
    
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
    { text: "Eczéma" as SkinCondition, icon: Zap },
    { text: "Aucune" as SkinCondition, icon: Sparkles },
  ];

  return (
    <div 
      className="concerns-page flex items-center justify-center px-4"
      style={{
        background: `url('/lovable-uploads/fb3ff92a-8049-4229-b2ce-8e9a41f262f1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >      
      <ProgressHeader currentStep={3} />
      
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10 pt-16">
        <div className="lg:pl-12 flex items-center h-full">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-title text-left"
          >
            Quelles sont vos principales préoccupations ?
          </motion.h1>
        </div>

        <div className="w-full max-w-xl space-y-4">
          {concerns.map((option, index) => (
            <motion.div
              key={option.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="concerns-button flex items-center space-x-4 p-4 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleOptionToggle(option.text)}
            >
              <Checkbox 
                checked={selectedConditions.includes(option.text)}
                onCheckedChange={() => handleOptionToggle(option.text)}
              />
              <option.icon className="w-6 h-6 stroke-current" />
              <span className="text-lg">{option.text}</span>
            </motion.div>
          ))}

          <Button 
            onClick={handleNext}
            className="w-full mt-8"
            disabled={selectedConditions.length === 0}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConcernsQuiz;