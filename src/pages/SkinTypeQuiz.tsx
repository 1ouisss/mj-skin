import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Droplet, Feather, Scale, User, Sparkles } from "lucide-react";

const SkinTypeQuiz = () => {
  const navigate = useNavigate();

  const handleOptionClick = () => {
    navigate("/daily-routine-quiz");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side with image and sun */}
        <div className="relative">
          <img
            src="/lovable-uploads/bf5e9159-9193-48e6-9add-09829379a4ef.png"
            alt="Skin type illustration"
            className="w-full h-auto rounded-lg"
          />
          <img
            src="/lovable-uploads/462b04ec-8dc1-454d-acf6-d62b18af6f7c.png"
            alt="Decorative sun"
            className="absolute -top-10 -left-10 w-32 h-32"
          />
        </div>

        {/* Right side with question and options */}
        <div className="space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-light tracking-wider leading-tight text-white mb-12"
          >
            Quel est votre type de peau principal ?
          </motion.h1>

          <div className="grid grid-cols-1 gap-4 max-w-md">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={handleOptionClick}
              className="bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 flex items-center gap-3 transition-colors"
            >
              <Droplet className="w-5 h-5" />
              <span>Sèche</span>
            </motion.button>

            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleOptionClick}
              className="bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 flex items-center gap-3 transition-colors"
            >
              <Feather className="w-5 h-5" />
              <span>Sensible</span>
            </motion.button>

            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleOptionClick}
              className="bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 flex items-center gap-3 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Grasse</span>
            </motion.button>

            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={handleOptionClick}
              className="bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 flex items-center gap-3 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Mixte</span>
            </motion.button>

            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleOptionClick}
              className="bg-white hover:bg-white/90 text-black rounded-full py-4 px-6 flex items-center gap-3 transition-colors"
            >
              <Scale className="w-5 h-5" />
              <span>Normale</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTypeQuiz;