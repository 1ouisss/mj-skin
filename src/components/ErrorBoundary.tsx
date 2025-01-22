import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.group('[ErrorBoundary]');
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    console.groupEnd();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center bg-white"
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
            <h2 className="text-2xl font-playfair text-[#4A4A4A] mb-4">
              Une erreur est survenue
            </h2>
            <p className="text-[#666] mb-6">
              {this.state.error?.message || "Veuillez réessayer plus tard."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#4A4A4A] text-white rounded-md hover:bg-[#3A3A3A] transition-colors"
            >
              Rafraîchir la page
            </button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}