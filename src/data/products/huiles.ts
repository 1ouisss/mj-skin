import { Product } from "../../types/skincare";

export const huiles: Product[] = [
  {
    id: "huile-abricot",
    name: "Huile d'Abricot",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/abricot-huile-vegetale-vierge",
    description: "L'huile d'abricot, extraite des noyaux est reconnue pour ses effets antiâges et assouplissants. Elle se révèle être votre partenaire idéale pour apaiser et adoucir votre peau. Ravivez votre teint et obtenez un teint frais instantanément.",
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
    skinTypes: ["Grasse", "Mixte", "Asphyxiée", "Atonique"],
    timeOfDay: "both",
    image: "/lovable-uploads/ffd86774-d7a1-4ed3-a169-94a0bf74e5fc.png",
    benefits: [
      "Apaise les glandes sébacées",
      "Adoucit & protège la peau",
      "Améliore l'élasticité"
    ]
  },
  {
    id: "huile-tamanu",
    name: "Huile Tamanu",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/tamanu-huile-vegetale-vierge",
    description: "L'huile est depuis longtemps utilisée dans les îles de l'Océan Pacifique et Indien pour ses nombreuses vertus qui font de l'huile de tamanu une des plus puissantes et réputées pour de nombreux bénéfices pour la peau, entre autres, du point de vue antiâge.",
    ingredients: "Calophyllum onophyllum seed oil",
    format: "30 ml",
    texture: "Huile légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Eczéma", "Acné"],
    skinTypes: ["Sensible", "Grasse", "Asphyxiée"],
    timeOfDay: "both",
    image: "/lovable-uploads/b2de444a-a0c0-4de5-acb9-5683ffc451f9.png",
    benefits: [
      "Apaisante",
      "Adoucissante",
      "Protectrice",
      "Régénérante"
    ]
  }
];
