import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProgressBar } from './components/ProgressBar';
import { BackButton } from './components/BackButton';

const Index = React.lazy(() => import('./pages/Index'));
const SkinTypeQuiz = React.lazy(() => import('./pages/SkinTypeQuiz'));
const ConditionsQuiz = React.lazy(() => import('./pages/ConditionsQuiz'));
const ConcernsQuiz = React.lazy(() => import('./pages/ConcernsQuiz'));
const ZonesQuiz = React.lazy(() => import('./pages/ZonesQuiz'));
const TreatmentQuiz = React.lazy(() => import('./pages/TreatmentQuiz'));
const FragranceQuiz = React.lazy(() => import('./pages/FragranceQuiz'));
const RoutineQuiz = React.lazy(() => import('./pages/RoutineQuiz'));
const NewsletterQuiz = React.lazy(() => import('./pages/NewsletterQuiz'));
const PreviewAnswers = React.lazy(() => import('./pages/PreviewAnswers'));
const Recommendations = React.lazy(() => import('./pages/Recommendations'));

function App() {
  return (
    <ErrorBoundary>
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
            {/* Route path="*" element={<Navigate to="/" replace />} /> */} {/*Removed Navigate as per the edited code.  May need to be added back depending on requirements.*/}
          </Routes>
        </Suspense>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;