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
      className="min-h-screen bg-[#F5F5F0] text-[#0A0A0F] flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side with question and options */}
        <div className="space-y-12">
          {/* Title section with decorative stars */}
          <div className="text-center lg:text-left space-y-4 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider leading-tight flex items-center justify-center lg:justify-start gap-4">
              <span className="text-2xl">✧</span>
              <span>Quelle est votre routine quotidienne actuelle ?</span>
              <span className="text-2xl">✧</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-xl">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-lg">Nettoyant</span>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full"
            >
              <Droplets className="w-6 h-6" />
              <span className="text-lg">Sérum</span>
            </motion.button>

            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full"
            >
              <CircleDot className="w-6 h-6" />
              <span className="text-lg">Crème hydratante</span>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full"
            >
              <Package className="w-6 h-6" />
              <span className="text-lg">Soin complet</span>
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 transition-colors w-full"
            >
              <XCircle className="w-6 h-6" />
              <span className="text-lg">Rien</span>
            </motion.button>
          </div>
        </div>

        {/* Right side with image */}
        <div className="relative order-first lg:order-last">
          <img 
            src="/lovable-uploads/1700f416-f9f4-4537-b49f-5ee64982afeb.png"
            alt="Portrait en noir et blanc"
            className="w-full h-auto rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DailyRoutineQuiz;