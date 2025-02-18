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
  traitementSpecifique?: RoutineStep;
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
          products: ["huile-nettoyante", "huile-abricot"],
          instructions: "Utiliser l'huile nettoyante pour un premier nettoyage, puis l'huile d'abricot pour un second nettoyage si nécessaire"
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
          instructions: "Nettoyer délicatement avec l'Huile Nettoyante"
        }
      }
    },
    "Sensible": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante", "creme-fraiche-nettoyante"],
          instructions: "Commencer par l'huile nettoyante puis utiliser la Crème Fraîche Nettoyante"
        }
      }
    },
    "Très sensible": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante", "eau-micellaire"],
          instructions: "Au choix : utiliser l'huile nettoyante ou l'eau micellaire selon la sensibilité de la peau"
        }
      }
    },
    "Rougeurs": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante", "eau-micellaire"],
          instructions: "Nettoyer délicatement avec l'huile nettoyante ou l'eau micellaire selon la sensibilité"
        }
      }
    },
    "Normale": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante"],
          instructions: "Nettoyer avec l'Huile Nettoyante en massage circulaire"
        }
      }
    },
    "Mixte": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante", "gel-aloes"],
          instructions: "Débuter avec l'Huile Nettoyante puis rafraîchir avec le Gel d'Aloès"
        }
      }
    },
    "Grasse": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante", "huile-jojoba"],
          instructions: "Utiliser l'Huile Nettoyante ou l'Huile de Jojoba selon les besoins de la peau"
        }
      }
    },
    "Sèche": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante", "creme-fraiche-nettoyante"],
          instructions: "Commencer par l'huile nettoyante puis terminer avec la Crème Fraîche Nettoyante"
        }
      }
    },
    "Terne": {
      routine: {
        nettoyage: {
          products: ["huile-nettoyante"],
          instructions: "Nettoyer avec l'Huile Nettoyante en massage tonique pour stimuler l'éclat"
        }
      }
    }
  },
  conditions: {
    "Boutons": {
      ajustement: {
        nettoyageImbibition: {
          products: ["exfopur", "huile-nettoyante"],
          instructions: "Utiliser l'huile nettoyante pour le démaquillage, puis appliquer Exfopur"
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
        traitementSpecifique: {
          products: ["cocktail-contour"],
          instructions: "Appliquer le Cocktail Contour sur le contour des yeux"
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
