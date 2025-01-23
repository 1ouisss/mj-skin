
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProgressBar } from './components/ProgressBar';
import { BackButton } from './components/BackButton';
import { QuizProvider } from './context/QuizContext';

const Index = React.lazy(() => import(/* webpackChunkName: "index" */ './pages/Index'));
const SkinTypeQuiz = React.lazy(() => import(/* webpackChunkName: "skintype" */ './pages/SkinTypeQuiz'));
const ConditionsQuiz = React.lazy(() => import(/* webpackChunkName: "conditions" */ './pages/ConditionsQuiz'));
const ConcernsQuiz = React.lazy(() => import(/* webpackChunkName: "concerns" */ './pages/ConcernsQuiz'));
const ZonesQuiz = React.lazy(() => import(/* webpackChunkName: "zones" */ './pages/ZonesQuiz'));
const TreatmentQuiz = React.lazy(() => import(/* webpackChunkName: "treatment" */ './pages/TreatmentQuiz'));
const FragranceQuiz = React.lazy(() => import(/* webpackChunkName: "fragrance" */ './pages/FragranceQuiz'));
const RoutineQuiz = React.lazy(() => import(/* webpackChunkName: "routine" */ './pages/RoutineQuiz'));
const NewsletterQuiz = React.lazy(() => import(/* webpackChunkName: "newsletter" */ './pages/NewsletterQuiz'));
const PreviewAnswers = React.lazy(() => import(/* webpackChunkName: "preview" */ './pages/PreviewAnswers'));
const Recommendations = React.lazy(() => import(/* webpackChunkName: "recommendations" */ './pages/Recommendations'));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <QuizProvider>
          <TooltipProvider>
            <Toaster />
            <ProgressBar />
            <BackButton />
            <Suspense fallback={<LoadingScreen message="Chargement..." />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/skintypequiz" element={<SkinTypeQuiz />} />
                <Route path="/conditionsquiz" element={<ConditionsQuiz />} />
                <Route path="/concernsquiz" element={<ConcernsQuiz />} />
                <Route path="/zonesquiz" element={<ZonesQuiz />} />
                <Route path="/treatmentquiz" element={<TreatmentQuiz />} />
                <Route path="/fragrancequiz" element={<FragranceQuiz />} />
                <Route path="/routinequiz" element={<RoutineQuiz />} />
                <Route path="/newsletterquiz" element={<NewsletterQuiz />} />
                <Route path="/preview" element={<PreviewAnswers />} />
                <Route path="/recommendations" element={<Recommendations />} />
              </Routes>
            </Suspense>
          </TooltipProvider>
        </QuizProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
