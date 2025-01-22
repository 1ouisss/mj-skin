
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useLocation } from 'react-router-dom';

const DebugRouter = () => {
  const location = useLocation();
  useEffect(() => {
    console.group('Router Debug');
    console.log('Current Route Path:', location.pathname);
    console.groupEnd();
  }, [location]);
  return null;
};
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
    // Clear localStorage for fresh state
    try {
      const storedAnswers = localStorage.getItem('quizAnswers');
      console.log('Current stored answers:', storedAnswers);
      
      // Debug any React state management issues
      if (process.env.NODE_ENV === 'development') {
        const reactDevTools = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (reactDevTools) {
          console.log('React DevTools detected');
        }
      }
    } catch (error) {
      console.error('[App] Storage error:', error);
    }

    return () => {
      console.log('[App] Component unmounting');
      console.log('[App] Final state check');
    };
  }, []);

  // Add global error handler
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.group('[Global Error Handler]');
      console.error('Uncaught error:', event.error);
      console.error('Error message:', event.message);
      console.error('Error stack:', event.error?.stack);
      console.groupEnd();
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.group('[Unhandled Promise Rejection]');
      console.error('Promise rejection:', event.reason);
      console.error('Promise stack:', event.reason?.stack);
      console.groupEnd();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <QuizProvider>
            <DebugRouter />
            <ErrorBoundary>
              <TooltipProvider>
                <Toaster />
            <ErrorBoundary>
              <Routes>
                  <Route 
                    path="/" 
                    element={
                      <Suspense fallback={<LoadingScreen />}>
                        <ErrorBoundary
                          fallback={
                            <div className="flex min-h-screen items-center justify-center">
                              <div className="text-center">
                                <h2 className="text-xl font-semibold">Une erreur est survenue</h2>
                                <button 
                                  onClick={() => window.location.reload()}
                                  className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                  Réessayer
                                </button>
                              </div>
                            </div>
                          }
                        >
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
                              {({ hasError }) => 
                                hasError ? (
                                  <Navigate to="/" replace />
                                ) : (
                                  <Component />
                                )
                              }
                            </ErrorBoundary>
                          </Suspense>
                        }
                      />
                    )
                  )}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
          </TooltipProvider>
            </ErrorBoundary>
          </QuizProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
