import { Product } from "../../types/skincare";

export const masques: Product[] = [
  {
    id: "karite-vanille-masque",
    name: "Pour ma protection solaire - Karité vanillé & Oxyde de zinc",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/pour-ma-protection-solaire-karite-vanille-oxyde-de-zinc",
    description: "Protection solaire naturelle au karité et à l'oxyde de zinc",
    ingredients: "Butyrospermum parkii butter, Zinc oxide, Vanilla planifolia extract",
    format: "50 g",
    texture: "Riche",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Normale", "Sensible"],
    timeOfDay: "both",
    image: "/lovable-uploads/99333a92-7332-4386-810c-303c510dac4d.png",
    benefits: ["Protection solaire naturelle", "Nourrit la peau", "Apaise"]
  },
  {
    id: "masque-eclaircissant",
    name: "Masque éclaircissant",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-eclaircissant",
    description: "Masque visage éclaircissant pour un teint lumineux",
    ingredients: "Vitamin C, Pearl powder",
    format: "250 ml",
    texture: "Crémeuse",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Taches"],
    skinTypes: ["Terne"],
    timeOfDay: "evening",
    image: "/lovable-uploads/d7a75326-2d45-436c-8a39-87cf556558f5.png",
    benefits: ["Éclaircit le teint", "Réduit les taches", "Illumine la peau"]
  },
  {
    id: "masque-chocolat",
    name: "Masque au Chocolat",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-chocolat",
    description: "Masque visage antiâge au chocolat",
    ingredients: "Theobroma cacao powder",
    format: "50 g",
    texture: "Crémeuse",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening",
    image: "/lovable-uploads/ea448995-d23c-40d0-9a1c-13385f150a26.png",
    benefits: ["Anti-âge", "Nourrit", "Antioxydant"]
  },
  {
    id: "masque-miel-cardamome",
    name: "Masque Miel Cardamome",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-de-miel-cardamome",
    description: "Masque de miel puissant, antirides, raffermissant et tenseur",
    ingredients: "Honey, Elettaria cardamomum seed extract",
    format: "45 ml",
    texture: "Riche",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening",
    image: "/lovable-uploads/871914cf-5874-4074-91e9-56d4d942ffcf.png",
    benefits: ["Raffermissant", "Anti-rides", "Tenseur"]
  },
  {
    id: "masque-miel-rose",
    name: "Masque Miel Rose de Bulgarie",
    type: "Masque",
    url: "https://maisonjacynthe.ca/fr/masque-miel-rose",
    description: "Masque apaisant au miel et à la rose de Bulgarie",
    ingredients: "Honey, Rosa damascena flower extract",
    format: "50 ml",
    texture: "Riche",
    duration: "> 10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Sensible"],
    timeOfDay: "evening",
    image: "/placeholder.svg",
    benefits: ["Apaise", "Hydrate", "Adoucit"]
  }
];
