import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative min-h-screen"
      style={{
        background: `url('/lovable-uploads/bd24b52e-f34b-46c2-b3cd-536c17c81cb7.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 backdrop-blur-[2px]" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2 mb-4"
        >
          <h2 className="text-lg tracking-[0.3em] text-gray-800 font-light">
            Maison
          </h2>
          <h3 className="text-lg tracking-[0.3em] text-gray-800 font-light">
            Jacynthe
          </h3>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl sm:text-7xl font-light tracking-[0.2em] text-gray-800 my-8"
        >
          MJ SKIN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl sm:text-2xl tracking-[0.15em] text-gray-700 font-light mb-12"
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
          className="px-8 py-3 text-gray-800 border border-gray-400 hover:border-gray-600 transition-colors duration-300 tracking-[0.2em] text-sm backdrop-blur-sm"
        >
          COMMENCER LE DIAGNOSTIC
        </motion.button>
      </div>
    </div>
  );
};

export default Index;