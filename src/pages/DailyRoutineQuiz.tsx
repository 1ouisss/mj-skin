import { useNavigate } from "react-router-dom";
import { Droplets, Package, XCircle, Sparkles, CircleDot } from "lucide-react";
import { motion } from "framer-motion";

const DailyRoutineQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/next-question");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F0E8] text-[#0A0A0F] flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-6xl mx-auto space-y-16">
        {/* Title section with decorative stars */}
        <div className="text-center space-y-4 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider leading-tight flex items-center justify-center gap-4">
            <span className="text-2xl">✧</span>
            <span>Quelle est votre routine quotidienne actuelle ?</span>
            <span className="text-2xl">✧</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side with options */}
          <div className="space-y-4 max-w-xl mx-auto w-full">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full shadow-sm"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-lg">Nettoyant</span>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full shadow-sm"
            >
              <Droplets className="w-6 h-6" />
              <span className="text-lg">Sérum</span>
            </motion.button>

            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full shadow-sm"
            >
              <CircleDot className="w-6 h-6" />
              <span className="text-lg">Crème hydratante</span>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full shadow-sm"
            >
              <Package className="w-6 h-6" />
              <span className="text-lg">Soin complet</span>
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full shadow-sm"
            >
              <XCircle className="w-6 h-6" />
              <span className="text-lg">Rien</span>
            </motion.button>
          </div>

          {/* Right side with image */}
          <div className="relative order-first lg:order-last">
            <img 
              src="/lovable-uploads/f8af41e8-0a15-43e7-97df-dd88dd35b6d4.png"
              alt="Sérum skincare"
              className="w-full h-auto rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyRoutineQuiz;