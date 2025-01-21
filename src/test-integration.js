
import dotenv from 'dotenv';
import Airtable from 'airtable';
import OpenAI from 'openai';
import { validateAirtableRecord, normalizeFieldValue } from './utils/airtable-validator.js';

dotenv.config();

async function testIntegration() {
  console.group('\n=== Testing Full Integration Flow ===');
  console.time('integration-test');

  // Test data
  const testUserData = {
    skinType: 'combination',
    conditions: 'acne',
    concerns: 'aging',
    zones: 'face',
    treatment: 'cream',
    fragrance: 'unscented',
    routine: '5-10min'
  };

  try {
    // 1. Test Airtable Connection and Data Validation
    console.log('\n1. Testing Airtable Query...');
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    
    const records = await base('Recommendations')
      .select({
        filterByFormula: `AND(
          OR(LOWER(TRIM({SkinType})) = "${normalizeFieldValue(testUserData.skinType)}",
             FIND(LOWER("${testUserData.skinType}"), LOWER({SkinType})) > 0),
          OR(LOWER(TRIM({Conditions})) = "${normalizeFieldValue(testUserData.conditions)}",
             FIND(LOWER("${testUserData.conditions}"), LOWER({Conditions})) > 0)
        )`
      })
      .all();

    console.log('Airtable Response:', {
      recordCount: records.length,
      sampleFields: records[0]?.fields ? Object.keys(records[0].fields) : [],
      firstRecord: records[0]?.fields
    });

    // Validate Airtable records
    const validatedRecords = records.map(record => validateAirtableRecord(record));
    const invalidRecords = validatedRecords.filter(v => !v.isValid);
    
    if (invalidRecords.length > 0) {
      console.error('Invalid records found:', invalidRecords);
      throw new Error('Invalid Airtable records detected');
    }

    // 2. Test OpenAI Integration
    console.log('\n2. Testing OpenAI Integration...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `Analyser le profil utilisateur suivant et générer des recommandations personnalisées:

Profil Principal:
- Type de peau: ${testUserData.skinType}
- Conditions: ${testUserData.conditions}
- Préoccupations: ${testUserData.concerns}

Informations Secondaires:
- Zones ciblées: ${testUserData.zones}
- Préférence de texture: ${testUserData.treatment}
- Préférence de parfum: ${testUserData.fragrance}
- Temps de routine: ${testUserData.routine}

Produits disponibles:
${records.map(r => r.fields.Products).flat().join(', ')}

Générer une réponse dans ce format:

Produits:
- Nettoyage: [produit]
- Eau florale: [produit]
- Sérum: [produit]
- Hydratant: [produit]

Routine:
Matin:
1. [étape détaillée]
2. [étape détaillée]
3. [étape détaillée]

Soir:
1. [étape détaillée]
2. [étape détaillée]
3. [étape détaillée]

Résultats attendus:
[bénéfices détaillés]`;

    console.log('\nPrompt Structure:', {
      length: prompt.length,
      sections: {
        profile: prompt.includes('Profil Principal'),
        products: prompt.includes('Produits disponibles'),
        format: prompt.includes('Générer une réponse dans ce format')
      }
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    // 3. Validate OpenAI Response Format
    const response = completion.choices[0].message.content;
    const formatValidation = {
      hasProducts: response.includes('Produits:'),
      hasRoutine: response.includes('Routine:'),
      hasMorning: response.includes('Matin:'),
      hasEvening: response.includes('Soir:'),
      hasResults: response.includes('Résultats attendus:')
    };

    console.log('\nResponse Format Validation:', formatValidation);
    
    if (!Object.values(formatValidation).every(v => v)) {
      throw new Error('Invalid response format from OpenAI');
    }

    console.log('\nTest completed successfully');
    console.timeEnd('integration-test');
    console.groupEnd();

  } catch (error) {
    console.error('\nTest failed:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    console.timeEnd('integration-test');
    console.groupEnd();
    process.exit(1);
  }
}

// Run the test
testIntegration()
  .catch(error => {
    console.error('Integration test failed:', error);
    process.exit(1);
  });
