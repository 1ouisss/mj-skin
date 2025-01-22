
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { QuizProvider } from './context/QuizContext';

console.log('[App] Initializing components and routes');

const pages = {
  Index: lazy(() => {
    console.log('[App] Loading Index component');
    return import('./pages/Index');
  }),
  SkinTypeQuiz: lazy(() => {
    console.log('[App] Loading SkinTypeQuiz component');
    return import('./pages/SkinTypeQuiz');
  }),
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

const App = () => {
  console.log('[App] Starting render');

  useEffect(() => {
    console.log('[App] Component mounted');
    return () => console.log('[App] Component unmounting');
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <QuizProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <ErrorBoundary>
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <Suspense fallback={<LoadingScreen />}>
                        <ErrorBoundary>
                          <pages.Index />
                        </ErrorBoundary>
                      </Suspense>
                    } 
                  />
                  {Object.entries(pages).map(([name, Component]) => 
                    name !== 'Index' && (
                      <Route
                        key={name}
                        path={`/${name.toLowerCase().replace('quiz', '')}`}
                        element={
                          <Suspense fallback={<LoadingScreen />}>
                            <ErrorBoundary>
                              <Component />
                            </ErrorBoundary>
                          </Suspense>
                        }
                      />
                    )
                  )}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </QuizProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
