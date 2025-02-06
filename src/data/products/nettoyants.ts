
import { Product } from "../../types/skincare";

export const nettoyants: Product[] = [
  {
    id: "huile-nettoyante",
    name: "Huile Nettoyante",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
    description: "Pour un nettoyage en douceur et en profondeur. Ce mélange non-comédogène calme les glandes sébacées et donc, par conséquent, elles sécrètent moins de sébum. Le géranium qu'il contient lutte contre le relâchement cutané et améliore l'élasticité de la peau.",
    ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca (Abricot) kernel oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil",
    format: "100 ml",
    texture: "Huile légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
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
  },
  {
    id: "huile-jojoba",
    name: "Huile de Jojoba",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/jojoba-huile-vegetale-vierge-100-ml",
    description: "L'huile de jojoba possède une particularité importante : sa composition se rapproche sensiblement de celle du sébum qui est produit par notre corps. Non-comédogène, elle calmera votre peau et l'assouplira afin de retarder les signes de vieillissement.",
    ingredients: "Simmondsia chinensis seed oil",
    format: "100 ml",
    texture: "Huile légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Peau grasse", "Acné"],
    skinTypes: ["Grasse", "Mixte", "Normale"],
    timeOfDay: "both",
    image: "/lovable-uploads/3513b045-133a-4e44-aef3-c907dbce1e4b.png",
    benefits: [
      "Apaise les glandes sébacées",
      "Adoucit & protège la peau",
      "Améliore l'élasticité",
      "Non-comédogène"
    ]
  },
  {
    id: "huile-abricot",
    name: "Huile d'Abricot",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/abricot-huile-vegetale-vierge",
    description: "L'huile d'abricot, extraite des noyaux est reconnue pour ses effets antiâges et assouplissants. Elle se révèle être votre partenaire idéale pour apaiser et adoucir votre peau.",
    ingredients: "Prunus armeniaca kernel oil",
    format: "30 ml",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Asphyxiée", "Normale", "Atonique"],
    timeOfDay: "both",
    image: "/lovable-uploads/8e273f01-53bf-4484-88ed-fe13bf742ae7.png",
    benefits: [
      "Régénère & protège de la déshydratation",
      "Raffermissante",
      "Relipidante & nourrissante"
    ]
  }
];
