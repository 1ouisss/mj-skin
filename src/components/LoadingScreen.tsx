
import { motion } from "framer-motion";

const spinTransition = {
  repeat: Infinity,
  duration: 1,
  ease: "linear"
};

const logoVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <div className="text-center">
        <motion.img
          variants={logoVariants}
          initial="initial"
          animate="animate"
          src="/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png"
          alt="MJ Skin Logo"
          className="w-32 h-32 mx-auto mb-8"
          loading="lazy"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={spinTransition}
          className="w-12 h-12 mx-auto mb-4 border-4 border-[#4A4A4A] border-t-transparent rounded-full"
        />
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-playfair text-[#4A4A4A]"
        >
          Chargement...
        </motion.p>
      </div>
    </motion.div>
  );
}
