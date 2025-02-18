
import { SkinType, SkinCondition } from "../types/skincare";
import { skinProducts } from "../data/products";

type RoutineStep = {
  products: string[];
  instructions?: string;
};

type SkinRoutine = {
  nettoyage?: RoutineStep;
  eauFlorale?: RoutineStep;
  nettoyageImbibition?: RoutineStep;
  hydratation?: RoutineStep;
  nutrition?: RoutineStep;
  protection?: RoutineStep;
};

type SkinTypeRoutine = {
  routine: SkinRoutine;
  description?: string;
};

type ConditionAdjustment = {
  ajustement: Partial<SkinRoutine>;
  description?: string;
};

export const skinRoutines: {
  types: Record<SkinType, SkinTypeRoutine>;
  conditions: Record<SkinCondition, ConditionAdjustment>;
} = {
  types: {
    "Acnéique": {
      routine: {
        nettoyage: {
          products: ["huile-jojoba", "gel-aloes"],
          instructions: "Appliquer l'huile de Jojoba puis le Gel d'Aloès"
        },
        eauFlorale: {
          products: ["eau-neroli", "eau-orange"],
          instructions: "Choisir entre Néroli ou Rose"
        },
        nettoyageImbibition: {
          products: ["exfopur", "dermopur-acne"],
          instructions: "Appliquer Exfopur et Dermopur Acné comme traitement"
        },
        hydratation: {
          products: ["gel-sebo"],
          instructions: "Appliquer le Gel Sébo"
        },
        nutrition: {
          products: ["huile-tamanu", "serum-chanvre-vetiver"],
          instructions: "Choisir entre l'Huile Tamanu ou le Sérum Chanvre & Vétiver"
        },
        protection: {
          products: ["mousseline-kukui"],
          instructions: "Terminer avec la Mousseline Kukui"
        }
      }
    },
    "Asphyxiée": {
      routine: {
        nettoyage: {
          products: ["huile-abricot", "huile-jojoba", "huile-tamanu"],
          instructions: "Utiliser une combinaison des huiles"
        },
        eauFlorale: {
          products: ["eau-neroli", "eau-orange", "eau-helichryse"],
          instructions: "Choisir l'eau florale adaptée"
        },
        nettoyageImbibition: {
          products: ["exfopur"],
          instructions: "Appliquer Exfopur avec l'eau florale"
        },
        hydratation: {
          products: ["gel-coup-eclat"],
          instructions: "Appliquer le Gel Coup d'éclat"
        },
        nutrition: {
          products: ["serum-immortelle", "serum-rose", "serum-chanvre-chrysantheme", "serum-chanvre-vetiver", "serum-jasmin-rose", "serum-neroli", "serum-magnolia", "serum-or", "serum-neutre"],
          instructions: "Choisir le sérum le plus adapté"
        },
        protection: {
          products: ["mousseline-kukui"],
          instructions: "Terminer avec la Mousseline Kukui"
        }
      }
    },
    "Atonique": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante"],
          instructions: "Nettoyer avec l'Huile Nettoyante"
        }
      }
    },
    "Sensible": {
      routine: {
        nettoyage: {
          products: ["creme-fraiche-nettoyante"],
          instructions: "Nettoyer délicatement avec la Crème Fraîche"
        }
      }
    },
    "Très sensible": {
      routine: {
        nettoyage: {
          products: ["eau-micellaire"],
          instructions: "Nettoyer doucement avec l'Eau Micellaire"
        }
      }
    },
    "Rougeurs": {
      routine: {
        nettoyage: {
          products: ["eau-micellaire"],
          instructions: "Nettoyer délicatement avec l'Eau Micellaire"
        }
      }
    },
    "Normale": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante"],
          instructions: "Nettoyer avec l'Huile Nettoyante"
        }
      }
    },
    "Mixte": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante", "gel-aloes"],
          instructions: "Combiner l'Huile Nettoyante et le Gel d'Aloès"
        }
      }
    },
    "Grasse": {
      routine: {
        nettoyage: {
          products: ["huile-jojoba", "gel-aloes"],
          instructions: "Utiliser l'Huile de Jojoba puis le Gel d'Aloès"
        }
      }
    },
    "Sèche": {
      routine: {
        nettoyage: {
          products: ["creme-fraiche-nettoyante"],
          instructions: "Nettoyer avec la Crème Fraîche"
        }
      }
    },
    "Terne": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante"],
          instructions: "Nettoyer avec l'Huile Nettoyante"
        }
      }
    }
  },
  conditions: {
    "Boutons": {
      ajustement: {
        nettoyageImbibition: {
          products: ["exfopur", "huile-nettoyante"],
          instructions: "Appliquer Exfopur et l'Huile Nettoyante en masque"
        }
      }
    },
    "Peau mixte": {
      ajustement: {
        hydratation: {
          products: ["gel-aloes"],
          instructions: "Utiliser le Gel d'Aloès comme hydratant"
        }
      }
    },
    "Peau grasse": {
      ajustement: {
        hydratation: {
          products: ["gel-sebo"],
          instructions: "Utiliser le Gel Sébo"
        }
      }
    },
    "Déshydratation": {
      ajustement: {
        hydratation: {
          products: ["hydrogel"],
          instructions: "Appliquer l'Hydrogel"
        }
      }
    },
    "Acné": {
      ajustement: {
        nettoyageImbibition: {
          products: ["exfopur", "dermopur-acne"],
          instructions: "Utiliser Exfopur et Dermopur Acné comme traitement"
        },
        nutrition: {
          products: ["huile-tamanu"],
          instructions: "Appliquer l'Huile de Tamanu"
        }
      }
    },
    "Rides": {
      ajustement: {
        nutrition: {
          products: ["serum-or"],
          instructions: "Utiliser le Sérum Or"
        }
      }
    },
    "Taches": {
      ajustement: {
        nettoyageImbibition: {
          products: ["claripro"],
          instructions: "Appliquer Claripro en traitement spécifique"
        }
      }
    },
    "Eczéma": {
      ajustement: {
        protection: {
          products: ["baume-apaisant"],
          instructions: "Terminer avec le Baume Apaisant"
        }
      }
    },
    "Cernes": {
      ajustement: {
        protection: {
          products: ["cocktail-contour"],
          instructions: "Appliquer le Cocktail Contour"
        }
      }
    },
    "Rougeurs": {
      ajustement: {
        eauFlorale: {
          products: ["eau-helichryse"],
          instructions: "Utiliser l'Eau d'Hélichryse"
        }
      }
    },
    "Aucune": {
      ajustement: {}
    }
  }
};

export const generateRoutine = (skinType: SkinType, conditions: SkinCondition[]): SkinRoutine => {
  const baseRoutine = skinRoutines.types[skinType]?.routine || {};
  let finalRoutine = { ...baseRoutine };

  conditions.forEach(condition => {
    const adjustment = skinRoutines.conditions[condition]?.ajustement;
    if (adjustment) {
      finalRoutine = {
        ...finalRoutine,
        ...adjustment
      };
    }
  });

  // Vérifier que tous les produits mentionnés existent dans le catalogue
  Object.entries(finalRoutine).forEach(([stepName, step]) => {
    if (step && Array.isArray(step.products)) {
      const validProducts = step.products.filter(productId => {
        const exists = Object.values(skinProducts).some(p => p.id === productId);
        if (!exists) {
          console.error(`ERREUR: Produit manquant dans le catalogue: ${productId} pour l'étape ${stepName}`);
        }
        return exists;
      });
      if (step.products.length !== validProducts.length) {
        console.warn(`ATTENTION: Certains produits ont été retirés de l'étape ${stepName} car ils n'existent pas dans le catalogue`);
        step.products = validProducts;
      }
    }
  });

  return finalRoutine;
};

export default skinRoutines;
