import { createContext, useContext, useState, ReactNode } from "react";
import { SkinType } from "@/utils/skinRecommendations";

export type SkinCondition = "Acné" | "Eczéma" | "Rougeurs" | "Aucune";

interface SkinTypeContextType {
  selectedSkinType: SkinType | null;
  setSelectedSkinType: (type: SkinType) => void;
  skinCondition: SkinCondition | null;
  setSkinCondition: (condition: SkinCondition) => void;
}

const SkinTypeContext = createContext<SkinTypeContextType | undefined>(undefined);

export function SkinTypeProvider({ children }: { children: ReactNode }) {
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(null);
  const [skinCondition, setSkinCondition] = useState<SkinCondition | null>(null);

  return (
    <SkinTypeContext.Provider value={{ 
      selectedSkinType, 
      setSelectedSkinType,
      skinCondition,
      setSkinCondition
    }}>
      {children}
    </SkinTypeContext.Provider>
  );
}

export function useSkinType() {
  const context = useContext(SkinTypeContext);
  if (context === undefined) {
    throw new Error("useSkinType must be used within a SkinTypeProvider");
  }
  return context;
}