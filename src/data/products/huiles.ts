
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
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Mixte", "Asphyxiée", "Atonique"],
    timeOfDay: "both",
    image: "/lovable-uploads/fd10d8ed-0e83-411d-9bd9-9c8cea8766fc.png",
    benefits: [
      "Apaise les glandes sébacées",
      "Adoucit & protège la peau",
      "Améliore l'élasticité"
    ]
  },
  {
    id: "huile-kukui",
    name: "Huile de Kukui",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/kukui-huile-vegetale-vierge",
    description: "Notre huile de kukui, à la fois fine et légère, aidera à la réparation et à l'apaisement de votre peau. Sa texture très pénétrante et non-comédogène ne laissera pas de film gras sur la peau. Ses propriétés nourrissantes combleront tous les besoins nécessaires à votre peau tout en procurant un effet antiâge.",
    ingredients: "Aleurites moluccana seed oil",
    format: "30 ml",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Atonique"],
    timeOfDay: "both",
    image: "/lovable-uploads/646fb2fd-d818-4524-b3d9-450f6dd0c156.png",
    benefits: [
      "Apaise, adoucit & protège",
      "Régénère, affermit et nourrit",
      "Idéal pour peaux sèches et abîmées"
    ]
  },
  {
    id: "huile-moringa",
    name: "Huile de Moringa",
    type: "Nettoyant",
    url: "https://maisonjacynthe.ca/fr/moringa-huile-vegetale-vierge",
    description: "Le Moringa est utilisé aussi bien en phytothérapie qu'en cosmétique. Les graines comestibles sont utilisées pour produire cette huile très prisée pour les soins de la peau et des cheveux.",
    ingredients: "Moringa oleifera seed oil",
    format: "30 ml",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Atonique"],
    timeOfDay: "both",
    image: "/lovable-uploads/9a673725-31bc-4018-bfff-959506979472.png",
    benefits: [
      "Apaise, adoucit & protège la peau",
      "Aide à prévenir les signes du vieillissement",
      "Nourrit la peau par voie d'hydratation"
    ]
  },
  {
    id: "huile-tamanu",
    name: "Huile Tamanu",
    type: "Traitement",
    url: "https://maisonjacynthe.ca/fr/tamanu-huile-vegetale-vierge",
    description: "L'huile est depuis longtemps utilisée dans les îles de l'Océan Pacifique et Indien pour ses nombreuses vertus qui font de l'huile de tamanu une des plus puissantes et réputées pour de nombreux bénéfices pour la peau, entre autres, du point de vue antiâge.",
    ingredients: "Calophyllum inophyllum seed oil",
    format: "30 ml",
    texture: "Fluide",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Acné", "Eczéma"],
    skinTypes: ["Sensible", "Grasse", "Asphyxiée"],
    timeOfDay: "evening",
    image: "/lovable-uploads/29d796e9-d164-4017-8ea3-0c36e951978b.png",
    benefits: [
      "Apaisante",
      "Adoucissante",
      "Protectrice",
      "Régénérante"
    ]
  }
];
