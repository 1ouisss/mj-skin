import { Product } from "../types/skincare";

export const skinProducts: Record<string, Product> = {
  cremeFraiche: {
    name: "Crème Fraîche",
    url: "https://maisonjacynthe.ca/fr/creme-fraiche",
    ingredients: "Citrus sinensis (Orange) water, Simmondsia chinensis (Jojoba) seed oil, Cetearyl olivate (Olivate de cétéaryle) (et) Sorbitan olivate (Olivate de sorbitan), Butyrospermum parkii (Karité) butter, Mangifera indica (Mangue) seed butter, Vanillin (Vanilline), Glycerin (Glycérine végétale), Tocopherol (Vitamine E), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium).",
    texture: "crémeuse",
    duration: "standard",
    hasEssentialOils: false
  },
  eauNeroli: {
    name: "Eau de Néroli enrichie",
    url: "https://maisonjacynthe.ca/fr/eau-de-neroli-enrichie",
    ingredients: "Citrus sinensis (Orange) water, Glycerin (Glycérine végétale), Citrus aurantium var amara (Néroli) flower oil, Citrus aurantium (Petit grain) leaf/twig oil.",
    texture: "légère",
    duration: "rapide",
    hasEssentialOils: true
  },
  lotusSacre: {
    name: "Lotus Sacré",
    url: "https://maisonjacynthe.ca/fr/booster-d-hydratation-acide-hyaluronique-lotus-sacre",
    ingredients: "Citrus sinensis (Orange) water, Aloe barbadensis (Aloès) leaf juice, Glycerin (Glycérine végétale), Hyaluronic acid (Acide hyaluronique), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium), Xanthan gum (Gomme xanthane), Nelumbo nucifera (Lotus rose) flower extract, Santalum album (Bois de santal) wood oil.",
    texture: "fluide",
    duration: "standard",
    hasEssentialOils: false
  },
  serumImmortelle: {
    name: "Sérum Immortelle",
    url: "https://maisonjacynthe.ca/fr/serum-immortelle-30-ml",
    ingredients: "Rosa canina (Rose musquée) fruit oil, Triticum vulgare/aestivum (Blé) extract oil, Hippophae rhamnoides (Argousier) CO2 extract, Tocopherol (Tocophérol), Tocotrienol (Tocotriénol), Rosmarinus officinalis (Romarin) CO2 leaf extract, Calendula officinalis (Calendule) CO2 extract, Helichrysum italicum (Immortelle) oil, Eucalyptus radiata (Eucalyptus radié) leaf oil.",
    texture: "légère",
    duration: "standard",
    hasEssentialOils: true
  },
  huileNettoyante: {
    name: "Huile Nettoyante",
    url: "https://maisonjacynthe.ca/fr/huile-nettoyante-100-ml",
    ingredients: "Simmondsia chinensis (Jojoba) seed oil, Prunus armeniaca kernel (Abricot) oil, Hippophae rhamnoides (Argousier) oil, Pelargonium x asperum (Géranium bourbon) leaf oil, Cananga odorata (Ylang-ylang) flower oil, Santalum album (Bois de santal) oil.",
    texture: "fluide",
    duration: "standard",
    hasEssentialOils: false
  },
  eauOrange: {
    name: "Eau d'Orange",
    url: "https://maisonjacynthe.ca/fr/eau-florale-d-orange",
    ingredients: "Eau d’orange (Citrus sinensis).",
    texture: "légère",
    duration: "rapide",
    hasEssentialOils: false
  },
  gelSebo: {
    name: "Gel Sébo",
    url: "https://maisonjacynthe.ca/fr/gel-sebo-regulateur",
    ingredients: "Aqua (Eau), Aloe barbadensis (Aloès) leaf juice, Simondsia chinensis (Jojoba) seed oil, Xanthan gum (Gomme xanthane), Rosmarinus officinalis verbenoniferum (Romarin à verbenone) oil, Lavandula latifolia (Lavande aspic) oil, Pelargonium X asperum (Géranium bourbon) leaf oil, Eucalyptus radiata (Eucalyptus radié) oil, Salvia sclarea (Sauge sclarée) oil, Cymbopogon martini (Palmarosa) oil, Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium).",
    texture: "légère",
    duration: "rapide",
    hasEssentialOils: false
  },
  gelAloes: {
    name: "Gel d'Aloès",
    url: "https://maisonjacynthe.ca/fr/gel-d-aloes-pur-50-ml",
    ingredients: "Aqua (Eau distillée), Aloe barbadensis (Aloès) leaf juice, Xanthan gum (Gomme de xanthane), Glycerin (Glycérine), Sodium benzoate (Benzoate de sodium), Potassium sorbate (Sorbate de potassium).",
    texture: "légère",
    duration: "rapide",
    hasEssentialOils: false
  },
  serumRose: {
    name: "Sérum Rose",
    url: "https://maisonjacynthe.ca/fr/catalog/product/view/id/887/s/serum-a-la-roses/",
    ingredients: "Rosa rubiginosa (Rose musquée) fruit oil, Oenothera biennis (Onagre) oil, Borago officinalis (Bourrache) seed oil, Rosmarinus officinalis (Romarin) leaf extract, Rosa damascena (Absolue de rose Damas) flower extract, Rosa damascena (Rose) flower oil, Santalum album (Bois de santal) oil, Tocopherol (Vitamine E), Hippophae rhamnoides (Argousier) oil.",
    texture: "fluide",
    duration: "standard",
    hasEssentialOils: true
  },
  exfopur: {
    name: "Exfopur",
    url: "https://maisonjacynthe.ca/fr/exfopur",
    ingredients: "Acide salicylique, Aloe vera, Tea tree",
    texture: "légère",
    duration: "standard",
    hasEssentialOils: true
  },
  masquePurifiant: {
    name: "Masque purifiant au charbon",
    url: "https://maisonjacynthe.ca/fr/masque-purifiant",
    ingredients: "Charbon actif, Argile, Aloe vera",
    texture: "crémeuse",
    duration: "standard",
    hasEssentialOils: false
  },
  hydrogelRafraichissant: {
    name: "Hydrogel rafraîchissant",
    url: "https://maisonjacynthe.ca/fr/hydrogel",
    ingredients: "Aloe vera, Concombre, Zinc",
    texture: "légère",
    duration: "rapide",
    hasEssentialOils: false
  },
  baumeApaisant: {
    name: "Baume Apaisant",
    url: "https://maisonjacynthe.ca/fr/baume-apaisant",
    ingredients: "Beurre de karité, Huile de jojoba, Calendula",
    texture: "riche",
    duration: "standard",
    hasEssentialOils: false
  },
  huileJojoba: {
    name: "Huile de Jojoba",
    url: "https://maisonjacynthe.ca/fr/huile-jojoba",
    ingredients: "Huile de jojoba pure",
    texture: "fluide",
    duration: "rapide",
    hasEssentialOils: false
  },
  eauDeRose: {
    name: "Eau de Rose",
    url: "https://maisonjacynthe.ca/fr/eau-de-rose",
    ingredients: "Eau de rose pure, Extraits de camomille",
    texture: "légère",
    duration: "rapide",
    hasEssentialOils: false
  },
  cremeApaisante: {
    name: "Crème Apaisante Camomille",
    url: "https://maisonjacynthe.ca/fr/creme-camomille",
    ingredients: "Camomille, Aloe vera, Panthénol",
    texture: "crémeuse",
    duration: "standard",
    hasEssentialOils: false
  },
  huileKukui: {
    name: "Huile réparatrice Kukui",
    url: "https://maisonjacynthe.ca/fr/huile-kukui",
    ingredients: "Huile de Kukui, Calendula, Camomille",
    texture: "fluide",
    duration: "standard",
    hasEssentialOils: false
  }
};
