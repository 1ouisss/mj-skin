import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { QuizProvider } from './context/QuizContext';

const DebugRouter = () => {
  const location = useLocation();
  React.useEffect(() => {
    console.group('Router Debug');
    console.log('Current Route Path:', location.pathname);
    console.groupEnd();
  }, [location]);
  return null;
};

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

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <QuizProvider>
          <TooltipProvider>
            <DebugRouter />
            <Toaster />
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
                    path={`/${name.toLowerCase()}`}
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
          </TooltipProvider>
        </QuizProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;