
import { motion } from 'framer-motion';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex items-center justify-center"
  >
    <div className="text-2xl font-playfair text-[#4A4A4A]">Chargement...</div>
  </motion.div>
);

export default LoadingScreen;
