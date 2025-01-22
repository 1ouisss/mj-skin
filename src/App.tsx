import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';

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
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));

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
          <Route path="/" element={
            <Suspense fallback={<LoadingScreen />}>
              <AnimatePresence mode="wait">
                <Index />
              </AnimatePresence>
            </Suspense>
          } />
          <Route path="/skin-type-quiz" element={
            <Suspense fallback={<LoadingScreen />}>
              <SkinTypeQuiz />
            </Suspense>
          } />
          <Route path="/conditions-quiz" element={<ConditionsQuiz />} />
          <Route path="/concerns-quiz" element={<ConcernsQuiz />} />
          <Route path="/zones-quiz" element={<ZonesQuiz />} />
          <Route path="/treatment-quiz" element={<TreatmentQuiz />} />
          <Route path="/fragrance-quiz" element={<FragranceQuiz />} />
          <Route path="/routine-quiz" element={<RoutineQuiz />} />
          <Route path="/newsletter-quiz" element={<NewsletterQuiz />} />
          <Route path="/recommendations" element={
  <ErrorBoundary>
    <Recommendations />
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

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex items-center justify-center"
  >
    <div className="text-2xl font-playfair text-[#4A4A4A]">Chargement...</div>
  </motion.div>
);

export default App;