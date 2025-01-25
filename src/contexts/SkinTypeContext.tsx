import { createContext, useContext, useState, ReactNode } from "react";
import { SkinType } from "@/utils/skinRecommendations";

interface SkinTypeContextType {
  selectedSkinType: SkinType | null;
  setSelectedSkinType: (type: SkinType) => void;
}

const SkinTypeContext = createContext<SkinTypeContextType | undefined>(undefined);

export function SkinTypeProvider({ children }: { children: ReactNode }) {
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(null);

  return (
    <SkinTypeContext.Provider value={{ selectedSkinType, setSelectedSkinType }}>
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