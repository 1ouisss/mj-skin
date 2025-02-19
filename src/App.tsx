
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkinTypeProvider } from "./contexts/SkinTypeContext";
import Index from "./pages/Index";
import SkinTypeQuiz from "./pages/SkinTypeQuiz";
import ConditionsQuiz from "./pages/ConditionsQuiz";
import ConcernsQuiz from "./pages/ConcernsQuiz";
import TreatmentQuiz from "./pages/TreatmentQuiz";
import Recommendations from "./pages/Recommendations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SkinTypeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/skin-type-quiz" element={<SkinTypeQuiz />} />
            <Route path="/conditions-quiz" element={<ConditionsQuiz />} />
            <Route path="/concerns-quiz" element={<ConcernsQuiz />} />
            <Route path="/treatment-quiz" element={<TreatmentQuiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SkinTypeProvider>
  </QueryClientProvider>
);

export default App;
