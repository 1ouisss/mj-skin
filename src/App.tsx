import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SkinTypeQuiz from "./pages/SkinTypeQuiz";
import PreviewAnswers from "./pages/PreviewAnswers";
import ConditionsQuiz from "./pages/ConditionsQuiz";
import ConcernsQuiz from "./pages/ConcernsQuiz";
import ZonesQuiz from "./pages/ZonesQuiz";
import TreatmentQuiz from "./pages/TreatmentQuiz";
import FragranceQuiz from "./pages/FragranceQuiz";
import RoutineQuiz from "./pages/RoutineQuiz";
import NewsletterQuiz from "./pages/NewsletterQuiz";
import Recommendations from "./pages/Recommendations";
import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center"
              >
                <div className="text-2xl font-playfair text-[#4A4A4A]">Chargement...</div>
              </motion.div>
            }>
              <AnimatePresence mode="wait">
                <Index />
              </AnimatePresence>
            </Suspense>
          } />
          <Route path="/skin-type-quiz" element={
            <Suspense fallback={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex items-center justify-center"
              >
                <div className="text-2xl font-playfair text-[#4A4A4A]">Chargement...</div>
              </motion.div>
            }>
              <AnimatePresence mode="wait">
                <SkinTypeQuiz />
              </AnimatePresence>
            </Suspense>
          } />
          <Route path="/conditions-quiz" element={<ConditionsQuiz />} />
          <Route path="/concerns-quiz" element={<ConcernsQuiz />} />
          <Route path="/zones-quiz" element={<ZonesQuiz />} />
          <Route path="/treatment-quiz" element={<TreatmentQuiz />} />
          <Route path="/fragrance-quiz" element={<FragranceQuiz />} />
          <Route path="/routine-quiz" element={<RoutineQuiz />} />
          <Route path="/newsletter-quiz" element={<NewsletterQuiz />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/preview" element={<PreviewAnswers />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;