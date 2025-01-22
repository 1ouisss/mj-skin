
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
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center bg-gray-50"
        >
          <div className="text-center p-8">
            <h2 className="text-2xl font-playfair text-[#4A4A4A] mb-4">
              Une erreur est survenue
            </h2>
            <p className="text-[#4A4A4A]">
              {this.state.error?.message || "Veuillez réessayer plus tard."}
            </p>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}
