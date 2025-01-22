import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

const pages = {
  Index: lazy(() => import('./pages/Index')),
  SkinTypeQuiz: lazy(() => import('./pages/SkinTypeQuiz')),
  ConditionsQuiz: lazy(() => import('./pages/ConditionsQuiz')),
  ConcernsQuiz: lazy(() => import('./pages/ConcernsQuiz')),
  ZonesQuiz: lazy(() => import('./pages/ZonesQuiz')),
  TreatmentQuiz: lazy(() => import('./pages/TreatmentQuiz')),
  FragranceQuiz: lazy(() => import('./pages/FragranceQuiz')),
  RoutineQuiz: lazy(() => import('./pages/RoutineQuiz')),
  NewsletterQuiz: lazy(() => import('./pages/NewsletterQuiz')),
  Recommendations: lazy(() => import('./pages/Recommendations')),
  PreviewAnswers: lazy(() => import('./pages/PreviewAnswers'))
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      suspense: true,
      useErrorBoundary: true
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            {Object.entries(pages).map(([name, Component]) => (
              <Route
                key={name}
                path={name === 'Index' ? '/' : `/${name.toLowerCase().replace('quiz', '')}`}
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <ErrorBoundary>
                      <Component />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;