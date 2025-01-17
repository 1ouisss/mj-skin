import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SkinTypeQuiz from "./pages/SkinTypeQuiz";
import DailyRoutineQuiz from "./pages/DailyRoutineQuiz";
import ConcernsQuiz from "./pages/ConcernsQuiz";
import ZonesQuiz from "./pages/ZonesQuiz";
import TreatmentQuiz from "./pages/TreatmentQuiz";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skin-type-quiz" element={<SkinTypeQuiz />} />
          <Route path="/daily-routine-quiz" element={<DailyRoutineQuiz />} />
          <Route path="/concerns-quiz" element={<ConcernsQuiz />} />
          <Route path="/zones-quiz" element={<ZonesQuiz />} />
          <Route path="/treatment-quiz" element={<TreatmentQuiz />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;