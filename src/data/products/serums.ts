import { Product } from "../../types/skincare";

export const serums: Product[] = [
  {
    id: "serum-immortelle",
    name: "Sérum Immortelle",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-immortelle",
    description: "Sérum anti-âge à l'immortelle",
    ingredients: "Helichrysum italicum oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening",
    image: "/placeholder.svg",
    benefits: ["Anti-rides", "Régénérant", "Raffermissant"]
  },
  {
    id: "serum-rose",
    name: "Sérum à la Rose",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-rose",
    description: "Sérum apaisant à la rose de Damas",
    ingredients: "Rosa damascena flower oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Rougeurs"],
    skinTypes: ["Sensible"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Apaise les rougeurs", "Hydrate", "Calme les irritations"]
  },
  {
    id: "serum-chanvre-chrysantheme",
    name: "Sérum Chanvre & Chrysanthème",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-chanvre-chrysantheme",
    description: "Sérum équilibrant au chanvre et chrysanthème",
    ingredients: "Cannabis sativa seed oil, Chrysanthemum extract",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "evening",
    image: "/placeholder.svg",
    benefits: ["Équilibre le sébum", "Anti-inflammatoire", "Réduit les imperfections"]
  },
  {
    id: "serum-chanvre-vetiver",
    name: "Sérum Chanvre & Vétiver",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-chanvre-vetiver",
    description: "Sérum purifiant au chanvre et vétiver",
    ingredients: "Cannabis sativa seed oil, Vetiveria zizanoides root oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Acné"],
    skinTypes: ["Grasse"],
    timeOfDay: "evening",
    image: "/placeholder.svg",
    benefits: ["Purifie la peau", "Resserre les pores", "Action antibactérienne"]
  },
  {
    id: "serum-jasmin-rose",
    name: "Sérum Jasmin Rose",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-jasmin-rose",
    description: "Sérum régénérant au jasmin et à la rose",
    ingredients: "Jasminum officinale oil, Rosa damascena flower oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening",
    image: "/placeholder.svg",
    benefits: ["Régénère la peau", "Lisse les rides", "Parfume délicatement"]
  },
  {
    id: "serum-neroli",
    name: "Sérum Néroli",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-neroli",
    description: "Sérum revitalisant au néroli",
    ingredients: "Citrus aurantium flower oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Revitalise la peau", "Tonifie", "Apporte de l'éclat"]
  },
  {
    id: "serum-magnolia",
    name: "Sérum Magnolia",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-magnolia",
    description: "Sérum illuminateur au magnolia",
    ingredients: "Magnolia grandiflora flower extract",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Terne"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Illumine le teint", "Anti-oxydant", "Protège la peau"]
  },
  {
    id: "serum-or",
    name: "Sérum Or",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-or",
    description: "Sérum anti-âge à l'or colloïdal",
    ingredients: "Colloidal gold, Hyaluronic acid",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Rides"],
    skinTypes: ["Normale", "Terne"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Lisse les rides", "Hydrate en profondeur", "Illumine le teint"]
  },
  {
    id: "serum-neutre",
    name: "Sérum neutre",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-neutre",
    description: "Sérum minimaliste pour les peaux sensibles",
    ingredients: "Simmondsia chinensis seed oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sensible"],
    timeOfDay: "both",
    image: "/placeholder.svg",
    benefits: ["Apaise la peau", "Hydrate", "Protège la barrière cutanée"]
  },
  {
    id: "elixir-myrrhe",
    name: "Élixir à la myrrhe",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/elixir-myrrhe",
    description: "Élixir régénérant à la myrrhe",
    ingredients: "Commiphora myrrha oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Rides"],
    skinTypes: ["Sèche", "Normale"],
    timeOfDay: "evening",
    image: "/placeholder.svg",
    benefits: ["Régénère la peau", "Anti-âge", "Nourrit intensément"]
  },
  {
    id: "serum-chanvre-vetiver",
    name: "Sérum Chanvre & Vétiver",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/serum-chanvre-vetiver-15ml",
    description: "Un parfum agréable et délicieux pour les peaux fragilisées et à tendance séborrhéique. Découvrez dès à présent notre Sérum Chanvre & Vétiver 100 % québécois afin d'offrir à votre peau une fraîcheur et un éclat sans précédent.",
    ingredients: "Mélange d'huiles essentielles naturelles",
    format: "15 ml",
    texture: "Huile légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Sensible"],
    timeOfDay: "both",
    image: "/lovable-uploads/0b144618-439e-4d34-8833-3891fa636733.png",
    benefits: [
      "Raffermissant",
      "Antirides",
      "Hydratant",
      "Convient aux peaux sensibles"
    ]
  },
  {
    id: "lotus-sacre",
    name: "Lotus Sacré",
    type: "Sérum",
    url: "https://maisonjacynthe.ca/fr/booster-d-hydratation-acide-hyaluronique-lotus-sacre",
    description: "La peau est hydratée en profondeur, dynamisée, plus tonique. S'utilise en « base de soin » juste après l'eau florale et avant le sérum.",
    ingredients: "Citrus sinensis water, Aloe barbadensis leaf juice, Glycerin, Hyaluronic acid, Sodium benzoate, Potassium sorbate, Xanthan gum, Nelumbo nucifera flower extract, Santalum album wood oil",
    format: "30 ml",
    texture: "Légère",
    duration: "5-10 minutes",
    hasEssentialOils: true,
    conditions: ["Déshydratation"],
    skinTypes: ["Terne", "Sèche"],
    timeOfDay: "both",
    image: "/lovable-uploads/12baf1b0-3ef6-4e1c-be16-ee6cdb226936.png",
    benefits: [
      "Hydrate en profondeur",
      "Illumine le teint",
      "Boost l'hydratation",
      "Action anti-âge"
    ]
  }
];
