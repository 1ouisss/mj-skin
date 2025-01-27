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
      className="fixed top-4 left-4 w-96 z-50"
    >
      <div className="max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
        <p className="text-sm text-white/90 mb-2 font-playfair tracking-[0.2em] text-left">
          ÉTAPE {currentStep}/{totalSteps}
        </p>
        <div className="relative">
          <Progress 
            value={progress} 
            className="h-3 bg-white/20 rounded-full overflow-hidden"
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