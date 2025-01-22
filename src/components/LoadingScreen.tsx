
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <img
        src="/lovable-uploads/287dc8a7-9ecf-4ef0-8110-df01a2c2be2d.png"
        alt="MJ Skin Logo"
        className="w-32 h-32 object-contain mb-8"
        loading="lazy"
      />
      <div className="w-12 h-12 border-4 border-[#4A4A4A] border-t-transparent rounded-full animate-spin" />
    </motion.div>
  );
};
