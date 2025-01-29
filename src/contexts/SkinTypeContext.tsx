import { createContext, useContext, useState, ReactNode } from "react";
import { SkinType, SkinCondition } from "../types/skincare";

interface SkinTypeContextType {
  selectedSkinType: SkinType | null;
  setSelectedSkinType: (type: SkinType) => void;
  selectedConditions: SkinCondition[];
  setSelectedConditions: (conditions: SkinCondition[]) => void;
}

const SkinTypeContext = createContext<SkinTypeContextType | undefined>(undefined);

export function SkinTypeProvider({ children }: { children: ReactNode }) {
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<SkinCondition[]>([]);

  return (
    <SkinTypeContext.Provider 
      value={{ 
        selectedSkinType, 
        setSelectedSkinType,
        selectedConditions,
        setSelectedConditions
      }}
    >
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