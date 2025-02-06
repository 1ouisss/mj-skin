
import { Product } from "../../types/skincare";

export const nettoyants: Product[] = [
  {
    id: "huile-nettoyante",
    name: "Huile Nettoyante",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
    description: "Pour un nettoyage en douceur et en profondeur. Ce mélange non-comédogène calme les glandes sébacées et donc, par conséquent, elles sécrètent moins de sébum. Le géranium qu'il contient lutte contre le relâchement cutané et améliore l'élasticité de la peau.",
    ingredients: "Simmondsia chinensis seed oil, Prunus armeniaca kernel oil",
    format: "100 ml",
    texture: "Huile légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sèche", "Grasse", "Mixte", "Sensible", "Normale"],
    timeOfDay: "both",
    image: "/lovable-uploads/7a479df1-5705-4433-9ece-1c80b98bf6b6.png",
    benefits: [
      "Nettoie & démaquille",
      "Protège & raffermit",
      "Améliore l'élasticité de la peau",
      "Régulatrice & hydratante"
    ]
  }
];
