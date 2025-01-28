import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SkinTypeProvider } from "./contexts/SkinTypeContext";
import SkinTypeQuiz from "./pages/SkinTypeQuiz";
import SkinConditionQuiz from "./pages/SkinConditionQuiz";
import Recommendations from "./pages/Recommendations";
import "./App.css";

function App() {
  return (
    <Router>
      <SkinTypeProvider>
        <Routes>
          <Route path="/" element={<SkinTypeQuiz />} />
          <Route path="/skin-type-quiz" element={<SkinTypeQuiz />} />
          <Route path="/skin-condition-quiz" element={<SkinConditionQuiz />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </SkinTypeProvider>
    </Router>
  );
}

export default App;