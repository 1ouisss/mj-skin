
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
        src="/lovable-uploads/cd3d9a96-5a28-4036-a47d-3841b59390d7.png"
        alt="Logo"
        className="w-24 h-24 mb-4"
        loading="lazy"
      />
      <div className="w-12 h-12 border-4 border-[#4A4A4A] border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-[#4A4A4A] font-playfair">Chargement...</p>
    </motion.div>
  );
};
