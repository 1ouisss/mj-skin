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
      className="fixed top-0 left-0 w-full px-4 pt-4 pb-2 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-[1px] z-50"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-gray-700 mb-2 font-playfair tracking-[0.2em] text-center">
          ÉTAPE {currentStep}/{totalSteps}
        </p>
        <div className="relative">
          <Progress 
            value={progress} 
            className="h-2.5 bg-[#FEF7CD]/60 rounded-full overflow-hidden"
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