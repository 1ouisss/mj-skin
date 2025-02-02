import { createContext, useContext, useState, ReactNode } from "react";
import { SkinType, SkinCondition, TexturePreference } from "../types/skincare";

interface SkinTypeContextType {
  selectedSkinType: SkinType | null;
  setSelectedSkinType: (type: SkinType) => void;
  selectedConditions: SkinCondition[];
  setSelectedConditions: (conditions: SkinCondition[]) => void;
  selectedTextures: TexturePreference[];
  setSelectedTextures: (textures: TexturePreference[]) => void;
  fragrancePreference: string;
  setFragrancePreference: (preference: string) => void;
}

const SkinTypeContext = createContext<SkinTypeContextType | undefined>(undefined);

export function SkinTypeProvider({ children }: { children: ReactNode }) {
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<SkinCondition[]>([]);
  const [selectedTextures, setSelectedTextures] = useState<TexturePreference[]>([]);
  const [fragrancePreference, setFragrancePreference] = useState<string>("");

  return (
    <SkinTypeContext.Provider 
      value={{ 
        selectedSkinType, 
        setSelectedSkinType,
        selectedConditions,
        setSelectedConditions,
        selectedTextures,
        setSelectedTextures,
        fragrancePreference,
        setFragrancePreference
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