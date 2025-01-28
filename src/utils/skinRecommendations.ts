export interface Product {
  name: string;
  url: string;
  ingredients: string;
}

export interface SkinRecommendation {
  products: Product[];
  morningRoutine: string;
  eveningRoutine: string;
  results: string;
}

export type SkinType = "Sèche" | "Grasse" | "Mixte" | "Sensible" | "Terne" | "Normale";

export const skinRecommendations: Record<SkinType, SkinRecommendation> = {
  "Sèche": {
    products: [
      {
        name: "Crème Fraîche",
        url: "https://maisonjacynthe.ca/fr/creme-fraiche",
        ingredients: "Citrus sinensis (Orange) water, Simmondsia chinensis (Jojoba) seed oil, Cetearyl olivate (Olivate de cétéaryle) (et) Sorbitan olivate (Olivate de sorbitan), Butyrospermum parkii (Karité) butter, Mangifera indica (Mangue) seed butter, Vanillin (Vanilline), Glycerin (Glycérine végétale), Tocopherol (Vitamine E), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium)."
      },
      {
        name: "Eau de Néroli enrichie",
        url: "https://maisonjacynthe.ca/fr/eau-de-neroli-enrichie",
        ingredients: "Citrus sinensis (Orange) water, Glycerin (Glycérine végétale), Citrus aurantium var amara (Néroli) flower oil, Citrus aurantium (Petit grain) leaf/twig oil."
      },
      {
        name: "Lotus Sacré",
        url: "https://maisonjacynthe.ca/fr/booster-d-hydratation-acide-hyaluronique-lotus-sacre",
        ingredients: "Citrus sinensis (Orange) water, Aloe barbadensis (Aloès) leaf juice, Glycerin (Glycérine végétale), Hyaluronic acid (Acide hyaluronique), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium), Xanthan gum (Gomme xanthane), Nelumbo nucifera (Lotus rose) flower extract, Santalum album (Bois de santal) wood oil."
      },
      {
        name: "Sérum Immortelle",
        url: "https://maisonjacynthe.ca/fr/serum-immortelle-30-ml",
        ingredients: "Rosa canina (Rose musquée) fruit oil, Triticum vulgare/aestivum (Blé) extract oil, Hippophae rhamnoides (Argousier) CO2 extract, Tocopherol (Tocophérol), Tocotrienol (Tocotriénol), Rosmarinus officinalis (Romarin) CO2 leaf extract, Calendula officinalis (Calendule) CO2 extract, Helichrysum italicum (Immortelle) oil, Eucalyptus radiata (Eucalyptus radié) leaf oil."
      }
    ],
    morningRoutine: "Nettoyage avec Crème Fraîche → Application de l'Eau de Néroli enrichie → Application de Lotus Sacré → Sérum Immortelle pour sceller l'hydratation.",
    eveningRoutine: "Nettoyage avec l'Huile Nettoyante → Tonification avec Eau de Rose → Application de Sérum Magnolia → Masque Collagène avec Karité Vanillé.",
    results: "Hydratation profonde et confort immédiat. 😊"
  },
  "Grasse": {
    products: [
      {
        name: "Huile Nettoyante",
        url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
        ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca kernel (Abricot) oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil."
      },
      {
        name: "Eau d'Orange",
        url: "https://maisonjacynthe.ca/fr/eau-florale-d-orange",
        ingredients: "Eau d’orange (Citrus sinensis)."
      },
      {
        name: "Gel Sébo",
        url: "https://maisonjacynthe.ca/fr/gel-sebo-regulateur",
        ingredients: "Aqua (Eau), Aloe barbadensis (Aloès) leaf juice, Simondsia chinensis (Jojoba) seed oil, Xanthan gum (Gomme xanthane), Rosmarinus officinalis verbenoniferum (Romarin à verbenone) oil, Lavandula latifolia (Lavande aspic) oil, Pelargonium X asperum (Géranium bourbon) leaf oil, Eucalyptus radiata (Eucalyptus radié) oil, Salvia sclarea (Sauge sclarée) oil, Cymbopogon martini (Palmarosa) oil, Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium)."
      },
      {
        name: "Gel d'Aloès",
        url: "https://maisonjacynthe.ca/fr/gel-d-aloes-pur-50-ml",
        ingredients: "Aqua (Eau distillée), Aloe barbadensis (Aloès) leaf juice, Xanthan gum (Gomme de xanthane), Glycerin (Glycérine), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium)."
      }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Sébo → Hydratation avec Gel d'Aloès.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Application de Gel Sébo → Masque Exfopur pour purifier → Sérum Huile Nettoyante pour régulation du sébum.",
    results: "Contrôle du sébum et réduction des imperfections. 🍊"
  },
  "Mixte": {
    products: [
      {
        name: "Huile Nettoyante",
        url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
        ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca kernel (Abricot) oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil."
      },
      {
        name: "Eau de Romarin",
        url: "https://maisonjacynthe.ca/fr/eau-florale-de-romarin",
        ingredients: "Eau florale de romarin (Rosmarinus officinalis)."
      },
      {
        name: "Gel Sébo",
        url: "https://maisonjacynthe.ca/fr/gel-sebo-regulateur",
        ingredients: "Aqua (Eau), Aloe barbadensis (Aloès) leaf juice, Simondsia chinensis (Jojoba) seed oil, Xanthan gum (Gomme xanthane), Rosmarinus officinalis verbenoniferum (Romarin à verbenone) oil, Lavandula latifolia (Lavande aspic) oil, Pelargonium X asperum (Géranium bourbon) leaf oil, Eucalyptus radiata (Eucalyptus radié) oil, Salvia sclarea (Sauge sclarée) oil, Cymbopogon martini (Palmarosa) oil, Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium)."
      },
      {
        name: "Sérum Rose",
        url: "https://maisonjacynthe.ca/fr/catalog/product/view/id/887/s/serum-a-la-roses/",
        ingredients: "Rosa rubiginosa (Rose musquée) fruit oil, Oenothera biennis (Onagre) oil, Borago officinalis (Bourrache) seed oil, Rosmarinus officinalis (Romarin) leaf extract, Rosa damascena (Absolue de rose Damas) flower extract, Rosa damascena (Rose) flower oil, Santalum album (Bois de santal) oil, Tocopherol (Vitamine E), Hippophae rhamnoides (Argousier) oil."
      }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Romarin → Application de Gel Sébo → Sérum Rose pour une hydratation équilibrée.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Gel Sébo → Sérum Rose → Masque Exfopur pour purifier les zones grasses.",
    results: "Peau équilibrée et éclatante. ✨"
  },
  "Sensible": {
    products: [
      {
        name: "Huile Nettoyante",
        url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
        ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca kernel (Abricot) oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil."
      },
      {
        name: "Eau de Rose",
        url: "https://maisonjacynthe.ca/fr/eau-florale-de-rose",
        ingredients: "Eau florale de Rosa damascena (Rose)."
      },
      {
        name: "Sérum Rose",
        url: "https://maisonjacynthe.ca/fr/catalog/product/view/id/887/s/serum-a-la-roses/",
        ingredients: "Rosa rubiginosa (Rose musquée) fruit oil, Oenothera biennis (Onagre) oil, Borago officinalis (Bourrache) seed oil, Rosmarinus officinalis (Romarin) leaf extract, Rosa damascena (Absolue de rose Damas) flower extract, Rosa damascena (Rose) flower oil, Santalum album (Bois de santal) oil, Tocopherol (Vitamine E), Hippophae rhamnoides (Argousier) oil."
      },
      {
        name: "Crème Fraîche",
        url: "https://maisonjacynthe.ca/fr/creme-fraiche",
        ingredients: "Citrus sinensis (Orange) water, Simmondsia chinensis (Jojoba) seed oil, Cetearyl olivate (Olivate de cétéaryle) (et) Sorbitan olivate (Olivate de sorbitan), Butyrospermum parkii (Karité) butter, Mangifera indica (Mangue) seed butter, Vanillin (Vanilline), Glycerin (Glycérine végétale), Tocopherol (Vitamine E), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium)."
      }
    ],
    morningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose pour apaiser → Hydratation avec Crème Fraîche.",
    eveningRoutine: "Nettoyage doux avec Huile Nettoyante → Application de l'Eau de Rose → Sérum Rose → Masque apaisant pour calmer les rougeurs.",
    results: "Apaisement immédiat et réduction des irritations. 🌼"
  },
  "Terne": {
    products: [
      {
        name: "Huile Nettoyante",
        url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
        ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca kernel (Abricot) oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil."
      },
      {
        name: "Eau d'Orange",
        url: "https://maisonjacynthe.ca/fr/eau-florale-d-orange",
        ingredients: "Eau d’orange (Citrus sinensis)."
      },
      {
        name: "Gel Coup d'Éclat",
        url: "https://maisonjacynthe.ca/fr/gel-hydratant-naturel-coup-d-eclat",
        ingredients: "Aqua (Eau), Aloe barbadensis (Aloès) leaf juice, Oenothera biennis (Onagre) seed oil, Xanthan gum (Gomme xanthane), Glycerin (Glycérine végétale), Potassium sorbate (Sorbate de potassium), Sodium benzoate (Benzoate de sodium), Citrus aurantium var amara (Néroli) oil, Citrus aurantium (Petit grain) leaf/twig oil, Citrus sinensis (Orange sauvage) oil, Commiphora myrrha (Myrrhe) oil."
      },
      {
        name: "Sérum Magnolia",
        url: "https://maisonjacynthe.ca/fr/serum-magnolia",
        ingredients: "Rosa canina (Rose musquée) seed oil, Abies balsamea (Sapin baumier) needle oil, Centella asiatica (Gotu kola) extract, Abies alba (Sapin argenté) needle oil, Michelia champaca (Absolue de champaca) flower oil, Zanthoxylum armatum (Frêne épineux) oil, Boswellia carterii (Encens) oil, Rosa damascena (Rose bulgare) flower oil, Bursera graveolens (Palo santo) oil, Tocopherol (Tocophérol), Tocotrienols (Tocotriénols)."
      }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau d'Orange → Application de Gel Coup d'Éclat → Sérum Magnolia pour une peau lumineuse.",
    eveningRoutine: "Double nettoyage avec Huile Nettoyante → Sérum Magnolia → Masque éclaircissant pour un boost d'éclat.",
    results: "Peau lumineuse et revitalisée. ✨"
  },
  "Normale": {
    products: [
      {
        name: "Huile Nettoyante",
        url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
        ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca kernel (Abricot) oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil."
      },
      {
        name: "Eau de Magnolia",
        url: "https://maisonjacynthe.ca/fr/eau-de-magnolia",
        ingredients: "ROSE (ROSA DAMASCENA) FLOWER WATER, GLYCERIN (VEGETABLE GLYCERIN), AQUA (WATER), ACETYL TETRAPEPTIDE-2, CAPRYLYL GLYCOL, HYALURONIC ACID, POLYSORBATE 80, SODIUM BENZOATE, POTASSIUM SORBATE, ABIES BALSAMEA (BALSAM FIR) NEEDLE OIL, ABIES PECTINATA (SILVER FIR) NEEDLE OIL, MICHELIA CHAMPACA (RED CHAMPACA ABSOLUTE) FLOWER EXTRACT, ZANTHOXYLUM ALATUM (PRICKLY ASH) FRUIT OIL, BOSWELLIA CARTERII (FRANKINCENSE) OIL, ROSA DAMASCENA (BULGARIAN ROSE) FLOWER OIL, BURSERA GRAVEOLENS (PALO SANTO) WOOD OIL."
      },
      {
        name: "Crème Fraîche",
        url: "https://maisonjacynthe.ca/fr/creme-fraiche",
        ingredients: "Citrus sinensis (Orange) water, Simmondsia chinensis (Jojoba) seed oil, Cetearyl olivate (Olivate de cétéaryle) (et) Sorbitan olivate (Olivate de sorbitan), Butyrospermum parkii (Karité) butter, Mangifera indica (Mangue) seed butter, Vanillin (Vanilline), Glycerin (Glycérine végétale), Tocopherol (Vitamine E), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium)."
      },
      {
        name: "Sérum Immortelle",
        url: "https://maisonjacynthe.ca/fr/serum-immortelle-30-ml",
        ingredients: "Rosa canina (Rose musquée) fruit oil, Triticum vulgare/aestivum (Blé) extract oil, Hippophae rhamnoides (Argousier) CO2 extract, Tocopherol (Tocophérol), Tocotrienol (Tocotriénol), Rosmarinus officinalis (Romarin) CO2 leaf extract, Calendula officinalis (Calendule) CO2 extract, Helichrysum italicum (Immortelle) oil, Eucalyptus radiata (Eucalyptus radié) leaf oil."
      }
    ],
    morningRoutine: "Nettoyage avec Huile Nettoyante → Tonification avec Eau de Magnolia → Application de Crème Fraîche → Sérum Immortelle pour préserver l'hydratation.",
    eveningRoutine: "Nettoyage avec Huile Nettoyante → Application de Sérum Immortelle → Masque Collagène pour revitaliser.",
    results: "Peau équilibrée et naturellement éclatante. 😊"
  }
};
