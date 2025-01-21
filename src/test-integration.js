
import dotenv from 'dotenv';
import Airtable from 'airtable';
import OpenAI from 'openai';

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
    // 1. Test Airtable Connection
    console.log('\n1. Testing Airtable Query...');
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    
    const records = await base('Recommendations')
      .select({
        filterByFormula: `AND(
          OR(LOWER(TRIM({SkinType})) = LOWER("${testUserData.skinType}"),
             FIND(LOWER("${testUserData.skinType}"), LOWER({SkinType})) > 0),
          OR(LOWER(TRIM({Conditions})) = LOWER("${testUserData.conditions}"),
             FIND(LOWER("${testUserData.conditions}"), LOWER({Conditions})) > 0)
        )`
      })
      .all();

    console.log('Airtable Response:', {
      recordCount: records.length,
      sampleFields: records[0]?.fields ? Object.keys(records[0].fields) : [],
      firstRecord: records[0]?.fields
    });

    // 2. Test OpenAI Integration
    console.log('\n2. Testing OpenAI Integration...');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `User Responses:
      SkinType: ${testUserData.skinType}
      Condition: ${testUserData.conditions}
      Concerns: ${testUserData.concerns}
      TexturePreference: ${testUserData.treatment}
      ScentPreference: ${testUserData.fragrance}
      RoutineTime: ${testUserData.routine}
      TargetAreas: ${testUserData.zones}

      Available Products from Airtable:
      ${records.map(r => r.fields.Products).flat().join(', ')}

      Generate a response in this format:
      Produits:
      Nettoyage:
      Eau florale:
      Sérum:
      Hydratant:

      Routine:
      Matin:
      [Detailed morning routine]
      
      Soir:
      [Detailed evening routine]
      
      Résultat attendu:`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('\nOpenAI Response:', {
      responseLength: completion.choices[0].message.content.length,
      usage: completion.usage,
      sampleContent: completion.choices[0].message.content.substring(0, 200) + '...'
    });

    // 3. Validate Response Format
    const response = completion.choices[0].message.content;
    const validationResults = {
      hasProducts: response.includes('Produits:'),
      hasRoutine: response.includes('Routine:'),
      hasMorning: response.includes('Matin:'),
      hasEvening: response.includes('Soir:'),
      hasExpectedResults: response.includes('Résultat attendu:')
    };

    console.log('\nResponse Validation:', validationResults);

    console.timeEnd('integration-test');
    console.groupEnd();
    return { success: true, validationResults };

  } catch (error) {
    console.error('\nIntegration Test Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    console.timeEnd('integration-test');
    console.groupEnd();
    throw error;
  }
}

// Run the test
testIntegration()
  .then(result => console.log('\nIntegration test completed successfully:', result))
  .catch(error => console.error('\nIntegration test failed:', error));
