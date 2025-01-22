
import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { QuizProvider } from './context/QuizContext';
import { ProgressBar } from './components/ProgressBar';
import { BackButton } from './components/BackButton';
import { quizSteps, getNextStepId } from './config/quizConfig';
import { toast } from 'sonner';

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

const SkinTypeQuiz = lazy(() => import('./pages/SkinTypeQuiz'));
const ConditionsQuiz = lazy(() => import('./pages/ConditionsQuiz'));
const ConcernsQuiz = lazy(() => import('./pages/ConcernsQuiz'));
const ZonesQuiz = lazy(() => import('./pages/ZonesQuiz'));
const TreatmentQuiz = lazy(() => import('./pages/TreatmentQuiz'));
const FragranceQuiz = lazy(() => import('./pages/FragranceQuiz'));
const RoutineQuiz = lazy(() => import('./pages/RoutineQuiz'));
const NewsletterQuiz = lazy(() => import('./pages/NewsletterQuiz'));
const PreviewAnswers = lazy(() => import('./pages/PreviewAnswers'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const Index = lazy(() => import('./pages/Index'));

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
            <ProgressBar />
            <BackButton />
            <Routes>
              <Route 
                path="/" 
                element={
                  <SuspenseWrapper>
                    <pages.Index />
                  </SuspenseWrapper>
                } 
              />
              {quizSteps.map((step) => (
                <Route
                  key={step.id}
                  path={`/${step.id}`}
                  element={
                    <SuspenseWrapper>
                      {step.id === 'skintypequiz' && <SkinTypeQuiz />}
                      {step.id === 'conditionsquiz' && <ConditionsQuiz />}
                      {step.id === 'concernsquiz' && <ConcernsQuiz />}
                      {step.id === 'zonesquiz' && <ZonesQuiz />}
                      {step.id === 'treatmentquiz' && <TreatmentQuiz />}
                      {step.id === 'fragrancequiz' && <FragranceQuiz />}
                      {step.id === 'routinequiz' && <RoutineQuiz />}
                      {step.id === 'newsletterquiz' && <NewsletterQuiz />}
                    </SuspenseWrapper>
                  }
                />
              ))}
<Route
  path="/preview"
  element={
    <SuspenseWrapper>
      <pages.preview />
    </SuspenseWrapper>
  }
/>
<Route
  path="/recommendations"
  element={
    <SuspenseWrapper>
      <pages.recommendations />
    </SuspenseWrapper>
  }
/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QuizProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
