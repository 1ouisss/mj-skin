import { useNavigate } from "react-router-dom";
import { Droplets, Feather, Scale, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/next-question");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0A0A0F] text-white flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side with image */}
        <div className="relative">
          <img 
            src="/lovable-uploads/e09ec530-10b3-4e88-9643-2271e24f1d92.png"
            alt="Portrait"
            className="w-full h-auto rounded-none"
          />
        </div>

        {/* Right side with question and options */}
        <div className="space-y-12">
          <div className="relative">
            {/* Rotating sun icon positioned above the text */}
            <div className="absolute -top-24 -left-24 w-32 h-32 animate-subtle-spin z-10">
              <img 
                src="/lovable-uploads/d7329930-b8d7-42f8-ab32-c4bd23005f4f.png" 
                alt="Sun icon"
                className="w-full h-full object-contain"
              />
            </div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider leading-tight relative z-0"
            >
              Quel est votre type de peau principal ?
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <Droplets className="w-6 h-6" />
              <span className="text-lg">Sèche</span>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="text-lg">Grasse</span>
            </motion.button>

            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <Feather className="w-6 h-6" />
              <span className="text-lg">Sensible</span>
            </motion.button>

            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors"
            >
              <Sparkles className="w-6 h-6" />
              <span className="text-lg">Mixte</span>
            </motion.button>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleOptionClick}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white rounded-full py-4 px-6 transition-colors md:col-span-2"
            >
              <Scale className="w-6 h-6" />
              <span className="text-lg">Normale</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkinTypeQuiz;