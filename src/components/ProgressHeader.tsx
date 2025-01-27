import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressHeader = ({ currentStep, totalSteps = 7 }: ProgressHeaderProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-4 left-4 w-48 z-50"
    >
      <div className="max-w-4xl">
        <p className="text-xs text-white/90 mb-1 font-playfair tracking-[0.2em] text-left">
          ÉTAPE {currentStep}/{totalSteps}
        </p>
        <div className="relative">
          <Progress 
            value={progress} 
            className="h-1.5 bg-[#FEF7CD]/60 rounded-full overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.2))'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressHeader;