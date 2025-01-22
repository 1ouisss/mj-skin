
import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="text-center max-w-md mx-auto p-8">
        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          src="/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png"
          alt="MJ Skin Logo"
          className="w-32 h-32 object-contain mx-auto mb-8"
          loading="lazy"
        />
        <div className="text-2xl font-playfair text-[#4A4A4A]">
          Chargement...
        </div>
      </div>
    </motion.div>
  );
}
