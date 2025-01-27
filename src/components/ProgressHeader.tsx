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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-4 top-1/4 -translate-y-1/4 z-50 flex flex-col justify-center items-center"
    >
      <div className="h-[60vh] bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg flex flex-col items-center">
        <p className="text-sm text-white/90 mb-2 font-playfair tracking-[0.2em] text-center rotate-180" style={{ writingMode: 'vertical-rl' }}>
          ÉTAPE {currentStep}/{totalSteps}
        </p>
        <div className="relative flex-1 flex items-center justify-center">
          <Progress 
            value={progress} 
            className="h-[300px] w-3 bg-white/20 rounded-full overflow-hidden [&>div]:rotate-180"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.2))'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressHeader;