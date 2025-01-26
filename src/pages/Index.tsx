import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="index-page relative min-h-screen"
      style={{
        background: `url('/lovable-uploads/bd24b52e-f34b-46c2-b3cd-536c17c81cb7.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="index-overlay absolute inset-0 bg-gradient-to-b from-transparent to-white/30 backdrop-blur-[2px]" />
      
      <div className="index-content relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        {/* Enhanced Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 w-full px-4 pt-8 pb-4 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-[1px]"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-700 mb-2 font-playfair tracking-[0.2em] text-center">
              ÉTAPE 0/8
            </p>
            <div className="relative">
              <Progress 
                value={0} 
                className="h-2.5 bg-[#FEF7CD]/60 rounded-full overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.2))'
                }}
              />
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.05)'
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="index-header space-y-2 mb-4"
        >
          <h2 className="index-subtitle text-lg tracking-[0.3em] text-gray-800 font-light">
            Maison
          </h2>
          <h3 className="index-subtitle text-lg tracking-[0.3em] text-gray-800 font-light">
            Jacynthe
          </h3>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="index-title text-6xl sm:text-7xl font-light tracking-[0.2em] text-gray-800 my-8"
        >
          MJ SKIN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="index-description text-xl sm:text-2xl tracking-[0.15em] text-gray-700 font-light mb-12"
        >
          DÉCOUVREZ LE POTENTIEL DE VOTRE PEAU
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/skin-type-quiz")}
          className="index-button px-8 py-3 text-gray-800 border border-gray-400 hover:border-gray-600 transition-colors duration-300 tracking-[0.2em] text-sm backdrop-blur-sm"
        >
          COMMENCER LE DIAGNOSTIC
        </motion.button>
      </div>
    </div>
  );
};

export default Index;