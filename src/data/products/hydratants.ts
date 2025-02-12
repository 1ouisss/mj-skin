import { Product } from "../../types/skincare";

export const hydratants: Product[] = [
  {
    id: "gel-sebo",
    name: "Gel Sébo",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-sebo-regulateur",
    description: "Le saviez-vous? L'excès de sébum étouffe la peau, empêchant ainsi l'élimination des cellules mortes et contribuant à la formation de comédons. Dans les cas d'hyperséborrhée à tendance comédogène, ne cherchez plus, notre Gel aidera à éliminer le surplus de sébum en décongestionnant les pores obstrués.",
    ingredients: "Aloe barbadensis leaf juice",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Acné", "Peau grasse"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both",
    image: "/lovable-uploads/023e5351-5cc1-4502-90a3-cd55c93e82c3.png",
    benefits: [
      "Élimine le surplus de sébum",
      "Contrôle le sébum",
      "Développé pour les peaux grasses"
    ]
  },
  {
    id: "dermopur-acne",
    name: "Dermopur Acné",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/dermopur-acne-soulagement-naturel-de-l-acne",
    description: "Notre formule Dermopur Acné a été spécialement développée pour lutter contre l'acné. Grâce à ses multiples mélanges d'huiles essentielles, notre formule s'attaquera aux bactéries responsables de vos boutons.",
    ingredients: "Mélange d'huiles essentielles",
    format: "30 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: true,
    conditions: ["Acné"],
    skinTypes: ["Grasse", "Mixte"],
    timeOfDay: "both",
    image: "/lovable-uploads/1700f416-f9f4-4537-b49f-5ee64982afeb.png",
    benefits: [
      "Soulagement symptomatique de l'acné",
      "Utilisable sur le corps et le visage",
      "Action antibactérienne"
    ]
  },
  {
    id: "hydrogel",
    name: "Hydrogel",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/hydrogel",
    description: "Votre peau se retrouve sans cesse irritée? Notre Hydrogel agit rapidement pour soulager et calmer les démangeaisons et deviendra votre allié pour résorber les petits boutons disgracieux.",
    ingredients: "Aloe barbadensis (Aloès) leaf juice",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Sensible", "Normale"],
    timeOfDay: "both",
    image: "/lovable-uploads/ddac9a03-ee74-454f-a221-8f1f58cb5386.png",
    benefits: [
      "Décongestionnant",
      "Rafraîchissant",
      "Fonction après-rasage",
      "Apaisant"
    ]
  },
  {
    id: "gel-coup-eclat",
    name: "Gel Coup d'éclat",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-hydratant-naturel-coup-d-eclat",
    description: "Pour une sensation de fraîcheur immédiate, optez pour notre Gel coup d'éclat. Hydratation et douceur se retrouvent au cœur de notre produit, facteurs indispensables pour garder une peau en bonne santé.",
    ingredients: "Aloe barbadensis leaf juice, actifs naturels",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Terne"],
    timeOfDay: "morning",
    image: "/lovable-uploads/1e129fb5-e59c-48d4-8061-d1b3b6d34119.png",
    benefits: [
      "Coup d'éclat instantané",
      "Teint lisse et unifié",
      "Hydratation et confort",
      "Soin antiâge"
    ]
  },
  {
    id: "gel-apaisant",
    name: "Gel Apaisant",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-peau-sensible-naturel-gel-apaisant",
    description: "Convient sur tous les types de peau et pour toutes les personnes se plaignant d'avoir une peau irritée qui rougit facilement et souvent, peau sensible à très sensible.",
    ingredients: "Aloe barbadensis leaf juice, actifs apaisants naturels",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Rougeurs"],
    skinTypes: ["Sensible", "Très sensible"],
    timeOfDay: "both",
    image: "/lovable-uploads/d3cc65ec-09ce-4800-9b36-a136ca9c5efa.png",
    benefits: [
      "Hydrate et revitalise la peau",
      "Améliore l'apparence des cicatrices",
      "Atténue la réactivité des peaux sensibles",
      "Rafraîchit la peau",
      "Atténue efficacement les rougeurs"
    ]
  },
  {
    id: "gel-aloes",
    name: "Gel d'Aloès",
    type: "Hydratant",
    url: "https://maisonjacynthe.ca/fr/gel-aloes",
    description: "Gel d'Aloès pur et naturel, apaisant et hydratant pour tous types de peau.",
    ingredients: "Aloe barbadensis leaf juice, Xanthan gum",
    format: "50 ml",
    texture: "Légère",
    duration: "< 5 minutes",
    hasEssentialOils: false,
    conditions: ["Aucune"],
    skinTypes: ["Normale", "Mixte", "Grasse", "Sensible"],
    timeOfDay: "both",
    image: "/lovable-uploads/d3cc65ec-09ce-4800-9b36-a136ca9c5efa.png",
    benefits: [
      "Hydratant",
      "Apaisant",
      "Réparateur",
      "Rafraîchissant"
    ]
  }
];
