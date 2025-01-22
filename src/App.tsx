
import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { QuizProvider } from './context/QuizContext';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">Page non trouvée</p>
      <button 
        onClick={() => window.location.href = '/'} 
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
);

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

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={
    <LoadingScreen 
      message="Chargement de la page..." 
      timeout={30000}
      onTimeout={() => toast.error("Le chargement prend plus de temps que prévu.")}
    />
  }>
    {children}
  </Suspense>
);

const App = () => {
  console.log('[App] Rendering');
  
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
                  <SuspenseWrapper>
                    <pages.Index />
                  </SuspenseWrapper>
                } 
              />
              {Object.entries(pages).map(([name, Component]) => 
                name !== 'Index' && (
                  <Route
                    key={name}
                    path={`/${name.toLowerCase()}`}
                    element={
                      <SuspenseWrapper>
                        <Component />
                      </SuspenseWrapper>
                    }
                  />
                )
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QuizProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
