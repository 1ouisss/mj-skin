
import { Product } from "../../types/skincare";

export const toniques: Product[] = [
  {
    id: "eau-neroli-enrichie",
    name: "Eau de Néroli Enrichie",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-de-neroli-enrichie",
    description: "Cette florale enrichie, au parfum joyeux, favorise l'apaisement de l'épiderme. Elle illumine le teint et avec elle, la beauté devient éclatante!",
    ingredients: "Eau florale de Néroli",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Mixte", "Sèche", "Sensible"],
    timeOfDay: "both",
    image: "/lovable-uploads/406315d5-1ee5-4cb5-97c6-ac09a194e824.png",
    benefits: ["Apaisante", "Rafraîchissante", "Régénérante cutanée"]
  },
  {
    id: "eau-rose",
    name: "Eau Florale de Rose",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-florale-de-rose",
    description: "L'eau florale de rose, une fois déposée sur votre peau, s'estompera afin d'offrir toutes les propriétés régénérantes et antiâges recherchées. Apaisante, elle permet de lutter contre les rougeurs tout en offrant un parfum enivrant remarquable.",
    ingredients: "Eau florale de Rose (Rosa damascena)",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs"],
    skinTypes: ["Normale", "Mixte", "Sèche", "Sensible"],
    timeOfDay: "both",
    image: "/lovable-uploads/fdc40c4a-00c7-4735-91b2-0c569845d4e9.png",
    benefits: ["Régénérante", "Calmante", "Hydratante", "Rafraîchissante"]
  },
  {
    id: "eau-romarin",
    name: "Eau Florale de Romarin",
    type: "Tonique",
    url: "",
    description: "Eau florale purifiante et tonifiante au romarin",
    ingredients: "Eau florale de Romarin",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Purifiant", "Tonifiant", "Rafraîchissant"]
  },
  {
    id: "eau-lavande",
    name: "Eau Florale de Lavande",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-florale-de-lavande",
    description: "Notre eau de fleur de lavande fournit un équilibre parfait à votre peau. Grâce à sa formule purifiante, votre peau grasse (voire sujette aux boutons) en bénéficiera. Apaisante, elle apportera une touche similaire à celle d'une caresse sur votre peau.",
    ingredients: "Eau florale de lavande (Lavandula angustifolia)",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Boutons"],
    skinTypes: ["Normale", "Mixte", "Grasse"],
    timeOfDay: "both",
    image: "/lovable-uploads/9cb1f4e1-b2dc-4e99-a6e4-9ce4b73817a1.png",
    benefits: ["Purifiante", "Astringente", "Régénérante"]
  },
  {
    id: "eau-camomille",
    name: "Eau Florale de Camomille",
    type: "Tonique",
    url: "https://maisonjacynthe.ca/fr/eau-florale-de-camomille",
    description: "Retrouvez votre teint éclatant grâce à notre eau florale de camomille romaine. Avec son parfum d'herbe, suave et fruité, profitez d'une peau réconfortée et rafraîchie. Elle calme les rougeurs ainsi que les irritations de la peau.",
    ingredients: "Eau florale de camomille romaine (Chamaemelum nobile)",
    format: "100 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs"],
    skinTypes: ["Sensible", "Normale"],
    timeOfDay: "both",
    image: "/lovable-uploads/73007342-98e7-4a5c-b3b6-8f95acb05475.png",
    benefits: ["Calmante", "Tonique", "Apaisante", "Régénérante"]
  }
];

