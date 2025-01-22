import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

const Index = lazy(() => import('./pages/Index'));
const SkinTypeQuiz = lazy(() => import('./pages/SkinTypeQuiz'));
const ConditionsQuiz = lazy(() => import('./pages/ConditionsQuiz'));
const ConcernsQuiz = lazy(() => import('./pages/ConcernsQuiz')); 
const ZonesQuiz = lazy(() => import('./pages/ZonesQuiz'));
const TreatmentQuiz = lazy(() => import('./pages/TreatmentQuiz'));
const FragranceQuiz = lazy(() => import('./pages/FragranceQuiz'));
const RoutineQuiz = lazy(() => import('./pages/RoutineQuiz'));
const NewsletterQuiz = lazy(() => import('./pages/NewsletterQuiz'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const PreviewAnswers = lazy(() => import('./pages/PreviewAnswers'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Index />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            }
          />
          <Route path="/skin-type-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <SkinTypeQuiz />
            </Suspense>
          } />
          <Route path="/conditions-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <ConditionsQuiz />
            </Suspense>
          } />
          <Route path="/concerns-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <ConcernsQuiz />
            </Suspense>
          } />
          <Route path="/zones-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <ErrorBoundary>
                <ZonesQuiz />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/treatment-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <ErrorBoundary>
                <TreatmentQuiz />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/fragrance-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <ErrorBoundary>
                <FragranceQuiz />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/routine-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <ErrorBoundary>
                <RoutineQuiz />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/newsletter-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <ErrorBoundary>
                <NewsletterQuiz />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/recommendations" element={
            <ErrorBoundary>
              <Suspense fallback={<LoadingScreen />}>
                <Recommendations />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/preview" element={
            <Suspense fallback={<LoadingScreen />}>
              <PreviewAnswers />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;