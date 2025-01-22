
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = React.memo(() => {
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.warn('[LoadingScreen] Still loading after 5s');
    }, 5000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#4A4A4A] border-t-transparent rounded-full"
        />
        <span className="text-[#4A4A4A] font-medium">Chargement...</span>
      </div>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';
