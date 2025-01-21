const express = require('express');
const Airtable = require('airtable');
const OpenAI = require('openai');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://*.replit.dev',
    'https://*.repl.co',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;

  const isAllowed = allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      const pattern = new RegExp(allowed.replace('*', '.*'));
      return pattern.test(origin);
    }
    return allowed === origin;
  });

  if (isAllowed) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
  }

  next();
});

// Test route with static data

// Validation function for Airtable records
function validateAirtableRecord(record) {
  const requiredFields = ['SkinType', 'Conditions', 'Concerns'];
  const validation = {
    isValid: true,
    missingFields: [],
    record: null
  };

  if (!record || !record.fields) {
    validation.isValid = false;
    validation.missingFields = ['fields'];
    return validation;
  }

  for (const field of requiredFields) {
    if (!record.fields[field]) {
      validation.isValid = false;
      validation.missingFields.push(field);
    }
  }

  if (validation.isValid) {
    validation.record = {
      id: record.id,
      ...record.fields
    };
  }

  return validation;
}

app.get('/api/responses', async (req, res) => {
  console.group('\n=== GET /api/responses ===');
  console.time('responses-fetch');
  
  try {
    console.log('Fetching User Responses from Airtable...');
    const records = await base('User Responses')
      .select({
        maxRecords: 100,
        view: 'Grid view'
      })
      .all();
    
    console.log(`Found ${records.length} total records`);

    // Validate records
    const validationResults = records.map(record => validateAirtableRecord(record));
    const validRecords = validationResults.filter(v => v.isValid).map(v => v.record);
    const invalidRecords = validationResults.filter(v => !v.isValid);

    console.log('\nValidation Results:', {
      totalRecords: records.length,
      validRecords: validRecords.length,
      invalidRecords: invalidRecords.length,
      invalidFieldDetails: invalidRecords.map(r => ({
        recordId: r.record?.id,
        missingFields: r.missingFields
      }))
    });
    
    // Log each record with formatting
    records.forEach((record, index) => {
      console.log(`\nRecord ${index + 1}:`, {
        id: record.id,
        createdTime: record.createdTime,
        fields: record.fields
      });
    });

    console.log('\nResponse Summary:', {
      totalRecords: records.length,
      validRecords: validRecords.length,
      firstValidId: validRecords[0]?.id,
      lastValidId: validRecords[validRecords.length - 1]?.id
    });

    console.timeEnd('responses-fetch');
    console.groupEnd();
    
    res.json({
      success: true,
      count: validRecords.length,
      records: validRecords,
      validation: {
        totalProcessed: records.length,
        validCount: validRecords.length,
        invalidCount: invalidRecords.length,
        invalidRecords: invalidRecords.map(r => ({
          id: r.record?.id,
          missingFields: r.missingFields
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching responses:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    console.timeEnd('responses-fetch');
    console.groupEnd();

    res.status(500).json({
      success: false,
      error: error.message,
      code: 'RESPONSES_FETCH_ERROR'
    });
  }
});

app.get('/test/recommendations', (req, res) => {
  const mockRecommendations = {
    success: true,

// Test route to fetch User Responses
app.get('/test/user-responses', async (req, res) => {
  console.group('\n=== GET /test/user-responses ===');
  console.time('user-responses-fetch');
  
  try {
    console.log('Fetching User Responses records...');
    const records = await base('User Responses')
      .select({
        maxRecords: 100,
        view: 'Grid view'
      })
      .all();
    
    console.log(`Found ${records.length} records`);
    
    const formattedRecords = records.map(record => ({
      id: record.id,
      createdTime: record.createdTime,
      ...record.fields
    }));

    console.log('\nSample record:', formattedRecords[0]);
    console.timeEnd('user-responses-fetch');
    console.groupEnd();
    
    res.json({
      success: true,
      count: formattedRecords.length,
      records: formattedRecords
    });

  } catch (error) {
    console.error('Error fetching User Responses:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    console.timeEnd('user-responses-fetch');
    console.groupEnd();

    res.status(500).json({
      success: false,
      error: error.message,
      code: 'USER_RESPONSES_ERROR'
    });
  }
});


    recommendations: `1. Skin Type Analysis
Your skin appears to be combination type with both oily and dry areas.

2. Main Concerns
- Acne-prone areas in T-zone
- Dryness on cheeks
- Uneven texture

3. Recommended Products
- Gentle Foaming Cleanser
- Oil-Free Moisturizer
- Salicylic Acid Treatment
- Hydrating Toner
- Weekly Clay Mask

4. Daily Routine
Morning:
1. Cleanse with Gentle Foaming Cleanser
2. Apply Hydrating Toner
3. Use Oil-Free Moisturizer
4. Apply Sunscreen

Evening:
1. Double cleanse
2. Apply Salicylic Acid Treatment
3. Use Oil-Free Moisturizer

Weekly:
- Use Clay Mask once per week`
  };

  res.json(mockRecommendations);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', {
    message: err.message,
    stack: err.stack,
    code: err.code
  });

  const errorResponse = {
    error: true,
    message: err.message || 'Une erreur interne est survenue',
    code: err.code || 'INTERNAL_ERROR',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  res.status(err.status || 500).json(errorResponse);
});

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Airtable Routes
app.get('/airtable/users', async (req, res) => {
  try {
    const records = await base('User Responses').select().all();
    res.json(records.map(record => ({
      id: record.id,
      ...record.fields
    })));
  } catch (error) {
    console.error('Airtable Users Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user responses',
      details: error.message,
      code: 'AIRTABLE_USERS_ERROR'
    });
  }
});

app.get('/airtable/recommendations', async (req, res) => {
  console.log('\n=== GET /airtable/recommendations ===');
  console.log('Query params:', req.query);

  try {
    console.log('Fetching Airtable recommendations...');
    const records = await base('Recommendations').select().all();
    console.log('\nRaw Airtable response:');
    console.log(JSON.stringify(records, null, 2));
    console.log(`\nTotal records found: ${records.length}`);

    const formattedRecords = records.map(record => ({
      id: record.id,
      ...record.fields
    }));
    console.log('\nFormatted records for frontend:');
    console.log(JSON.stringify(formattedRecords, null, 2));

    // Validate data structure
    const validationResults = formattedRecords.every(record => {
      const hasRequiredFields = record.id && record.SkinType && record.Concerns;
      if (!hasRequiredFields) {
        console.warn('Missing required fields in record:', record);
      }
      return hasRequiredFields;
    });

    console.log('\nData validation:', validationResults ? 'Passed' : 'Failed');

    res.json(formattedRecords);
  } catch (error) {
    console.error('Airtable recommendations error:', error);
    res.status(500).json({ error: error.message });
  }
});


const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function retryOperation(operation, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry attempt ${i + 1}/${retries} after error:`, error.message);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * Math.pow(2, i)));
    }
  }
}

function validateOpenAIResponse(response) {
  const requiredSections = ['Produits:', 'Routine:', 'Matin:', 'Soir:', 'Résultats attendus:'];
  const valid = requiredSections.every(section => response.includes(section));

  if (!valid) {
    throw new Error('Invalid OpenAI response format');
  }

  return response;
}

app.post('/openai/analyze', async (req, res) => {
  console.group('\n=== Backend: POST /openai/analyze ===');
  console.time('analyze-request');
  console.log('Full Request Data:', {
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });

  try {
    const { userResponses } = req.body;

    if (!userResponses) {
      console.error('Error: Missing user responses');
      return res.status(400).json({
        error: 'Missing user responses',
        code: 'MISSING_USER_RESPONSES'
      });
    }

    // Validate required fields
    const requiredFields = ['skinType', 'conditions', 'concerns', 'zones', 'treatment', 'fragrance', 'routine'];
    const missingFields = requiredFields.filter(field => !userResponses[field]);

    if (missingFields.length) {
      console.error('Validation Error: Missing required fields:', missingFields);
      return res.status(400).json({
        error: "Missing required fields",
        code: 'MISSING_REQUIRED_FIELDS',
        missingFields,
      });
    }

    console.log('Validated Data:', {
      ...userResponses,
      timestamp: new Date().toISOString()
    });

    // Fetch relevant recommendations from Airtable
    console.log('Fetching Airtable recommendations for:', userResponses.skinType, userResponses.concerns);
    try {
      // Validate required fields
      const requiredFields = ['skinType', 'conditions', 'concerns', 'zones', 'treatment', 'fragrance', 'routine'];
      const missingFields = requiredFields.filter(field => !userResponses[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Missing required fields',
          missingFields: missingFields.reduce((acc, field) => ({
            ...acc,
            [field]: !userResponses[field]
          }), {})
        });
      }

      console.log('Querying Airtable with all fields:', userResponses);

      const recommendations = await base('Recommendations')
        .select({
          fields: ['SkinType', 'Conditions', 'Concerns', 'Zones', 'Treatment', 'Fragrance', 'Routine', 'Products', 'Notes'],
          filterByFormula: `AND(
            OR(LOWER(TRIM({SkinType})) = LOWER("${userResponses.skinType}"),
               FIND(LOWER("${userResponses.skinType}"), LOWER({SkinType})) > 0),
            OR(LOWER(TRIM({Conditions})) = LOWER("${userResponses.conditions}"),
               FIND(LOWER("${userResponses.conditions}"), LOWER({Conditions})) > 0),
            OR(LOWER(TRIM({Concerns})) = LOWER("${userResponses.concerns}"),
               FIND(LOWER("${userResponses.concerns}"), LOWER({Concerns})) > 0),
            OR(LOWER(TRIM({Zones})) = LOWER("${userResponses.zones}"),
               FIND(LOWER("${userResponses.zones}"), LOWER({Zones})) > 0),
            OR(LOWER(TRIM({Treatment})) = LOWER("${userResponses.treatment}"),
               FIND(LOWER("${userResponses.treatment}"), LOWER({Treatment})) > 0),
            OR(LOWER(TRIM({Fragrance})) = LOWER("${userResponses.fragrance}"),
               FIND(LOWER("${userResponses.fragrance}"), LOWER({Fragrance})) > 0),
            OR(LOWER(TRIM({Routine})) = LOWER("${userResponses.routine}"),
               FIND(LOWER("${userResponses.routine}"), LOWER({Routine})) > 0)
          )`
        }).all();

      console.log('Fetched Airtable Data:', recommendations.map(record => record.fields));
      console.log('Airtable response:', {
        recordCount: recommendations.length,
        records: recommendations.map(r => ({ id: r.id, ...r.fields }))
      });
    } catch (airtableError) {
      console.error('Airtable error:', airtableError);
      return res.status(500).json({
        error: 'Failed to fetch recommendations',
        code: 'AIRTABLE_ERROR',
        details: airtableError.message
      });
    }

    // Prepare the prompt for OpenAI with Airtable data
    const prompt = `Based on the following user responses and product recommendations, provide personalized skincare advice:
      User Profile:
      ${JSON.stringify(userResponses, null, 2)}

      Available Products:
      ${JSON.stringify(recommendations.map(r => r.fields), null, 2)}

      Please provide recommendations in the following format:
      1. Skin Type Analysis
      2. Main Concerns
      3. Recommended Products (use products from the available list)
      4. Daily Routine`;

    console.log('Sending request to OpenAI with prompt:', prompt);
    try {
      const completion = await retryOperation(async () => {
        console.log('Requesting OpenAI completion...');
        const result = await openai.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "gpt-3.5-turbo",
          temperature: 0.7,
          max_tokens: 1000,
        });
        return result;
      });
      console.log('OpenAI response:', {
        choices: completion.choices,
        usage: completion.usage
      });

      const response = { 
        recommendations: completion.choices[0].message.content,
        success: true 
      };
      console.log('Successfully generated recommendations');
      console.timeEnd('analyze-request');
      console.groupEnd();
      res.json(response);
    } catch (openaiError) {
      console.error('OpenAI API Error:', {
        name: openaiError.name,
        message: openaiError.message,
        status: openaiError.status,
        response: openaiError.response?.data
      });
      return res.status(500).json({
        error: 'Failed to generate recommendations',
        code: 'OPENAI_ERROR',
        details: openaiError.message
      });
    }
  } catch (error) {
    console.error('General error:', error);
    res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      details: error.message
    });
  }
});

app.get('/airtable/recommendations', async (req, res) => {
  const requestId = Date.now().toString(36);
  console.group(`\n=== GET /airtable/recommendations (${requestId}) ===`);
  console.time(`request-${requestId}`);

  // Log request details
  console.log({
    timestamp: new Date().toISOString(),
    requestId,
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers,
    ip: req.ip
  });

  try {
    console.log('Initiating Airtable request...');
    console.time(`airtable-fetch-${requestId}`);

    const airtableQuery = {
      maxRecords: 100,
      view: 'Grid view',
      filterByFormula: req.query.filter || ''
    };
    console.log('Airtable query parameters:', airtableQuery);

    const records = await retryOperation(async () => {
      console.log('Fetching Airtable records...');
      return await base('Recommendations').select(airtableQuery).all();
    });
    console.timeEnd(`airtable-fetch-${requestId}`);
    console.log('Airtable response received:', {
      recordCount: records.length,
      firstRecordId: records[0]?.id
    });

    if (!Array.isArray(records)) {
      const error = new Error('Invalid response format from Airtable');
      error.code = 'INVALID_RESPONSE_FORMAT';
      error.status = 502;
      throw error;
    }

    // Validate and format each record
    const validationResults = {
      total: records.length,
      valid: 0,
      invalid: 0,
      validationErrors: []
    };

    const formattedRecords = records.map((record, index) => {
      if (!record || !record.fields) {
        validationResults.invalid++;
        validationResults.validationErrors.push({
          index,
          error: 'Malformed record structure',
          recordId: record?.id
        });
        return null;
      }

      // Required fields validation
      const requiredFields = ['SkinType', 'Concerns', 'Products'];
      const missingFields = requiredFields.filter(field => !record.fields[field]);

      if (missingFields.length > 0) {
        validationResults.invalid++;
        validationResults.validationErrors.push({
          index,
          error: 'Missing required fields',
          recordId: record.id,
          missingFields
        });
        return null;
      }

      return {
        id: record.id,
        skinType: record.fields.SkinType,
        concerns: Array.isArray(record.fields.Concerns) 
          ? record.fields.Concerns 
          : [record.fields.Concerns],
        products: Array.isArray(record.fields.Products) 
          ? record.fields.Products 
          : [record.fields.Products],
        notes: record.fields.Notes || '',
        ...record.fields
      };
    }).filter(Boolean); // Remove null records

    console.log('Data validation summary:', {
      totalRecords: records.length,
      validRecords: formattedRecords.length,
      invalidRecords: records.length - formattedRecords.length
    });

    if (formattedRecords.length === 0) {
      throw new Error('No valid recommendations found');
    }

    console.log('Sample formatted record:', JSON.stringify(formattedRecords[0], null, 2));
    console.timeEnd('request-duration');
    console.groupEnd();

    validationResults.valid = formattedRecords.filter(Boolean).length;

    console.log('Validation results:', validationResults);

    const response = {
      success: true,
      requestId,
      timestamp: new Date().toISOString(),
      metrics: {
        totalRecords: validationResults.total,
        validRecords: validationResults.valid,
        invalidRecords: validationResults.invalid,
        processingTimeMs: Date.now() - parseInt(requestId, 36)
      },
      data: formattedRecords.filter(Boolean)
    };

    if (validationResults.validationErrors.length > 0) {
      response.warnings = validationResults.validationErrors;
    }

    console.log('Sending response:', {
      statusCode: 200,
      responseSize: JSON.stringify(response).length,
      recordCount: response.data.length
    });

    console.timeEnd(`request-${requestId}`);
    console.groupEnd();
    res.json(response);

  } catch (error) {
    console.error('Error processing request:', {
      requestId,
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });

    const errorResponse = {
      success: false,
      requestId,
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        code: error.code || error.name || 'INTERNAL_ERROR',
        status: error.status || 500,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    };

    console.timeEnd(`request-${requestId}`);
    console.groupEnd();
    res.status(error.status || 500).json(errorResponse);
  }
});

app.post('/api/analyze', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: req.body.text }],
      model: "gpt-3.5-turbo",
    });
    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

const normalizeFieldValue = (value) => {
    if (typeof value === 'string'){
        return value.toLowerCase().trim();
    }
    return value;
}

app.post('/api/recommendations', async (req, res) => {
    const requestId = Date.now().toString(36);
    console.group(`\n=== POST /api/recommendations (${requestId}) ===`);
    console.time(`request-${requestId}`);

    console.log('\n=== Request Payload Details ===');
    console.log('Raw payload:', req.body);

    // Validate and prioritize core fields
    const priorityFields = {
        skinType: req.body.skinType?.trim(),
        conditions: req.body.conditions?.trim(),
        concerns: req.body.concerns?.trim()
    };

    const secondaryFields = {
        zones: req.body.zones?.trim(),
        treatment: req.body.treatment?.trim(),
        fragrance: req.body.fragrance?.trim(),
        routine: req.body.routine?.trim()
    };

    // Validate priority fields
    const missingPriorityFields = Object.entries(priorityFields)
        .filter(([_, value]) => !value)
        .map(([field]) => field);

    if (missingPriorityFields.length > 0) {
        return res.status(400).json({
            error: "Missing critical fields",
            missingFields: missingPriorityFields,
            code: "MISSING_PRIORITY_FIELDS"
        });
    }

    try {
        // Query Airtable with priority-based filtering
        const records = await retryOperation(async () => {
          console.log('Fetching Airtable records...');
          return await base('Recommendations')
            .select({
                filterByFormula: `AND(
                    OR(LOWER(TRIM({SkinType})) = "${normalizeFieldValue(priorityFields.skinType)}",
                       FIND(LOWER("${priorityFields.skinType}"), LOWER({SkinType})) > 0),
                    OR(LOWER(TRIM({Conditions})) = "${normalizeFieldValue(priorityFields.conditions)}",
                       FIND(LOWER("${priorityFields.conditions}"), LOWER({Conditions})) > 0),
                    OR(LOWER(TRIM({Concerns})) = "${normalizeFieldValue(priorityFields.concerns)}",
                       FIND(LOWER("${priorityFields.concerns}"), LOWER({Concerns})) > 0)
                )`
            })
            .all();
        });

        if (!records || records.length === 0) {
            return res.status(404).json({
                error: "No matching recommendations found",
                code: "NO_RECOMMENDATIONS"
            });
        }

        // Generate OpenAI prompt with structured format
        const prompt = `Analyser le profil utilisateur suivant et générer des recommandations personnalisées:

Profil Principal:
- Type de peau: ${priorityFields.skinType}
- Conditions: ${priorityFields.conditions}
- Préoccupations: ${priorityFields.concerns}

Informations Secondaires:
- Zones ciblées: ${secondaryFields.zones}
- Préférence de texture: ${secondaryFields.treatment}
- Préférence de parfum: ${secondaryFields.fragrance}
- Temps de routine: ${secondaryFields.routine}

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

        console.log('\n=== OpenAI Prompt ===');
        console.log(prompt);

        const completion = await retryOperation(async () => {
          console.log('Requesting OpenAI completion...');
          const result = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 1000,
          });
          return result;
        });

        console.log('\n=== OpenAI Response ===');
        console.log(completion.choices[0].message.content);

        // Validate OpenAI response format
        const response = validateOpenAIResponse(completion.choices[0].message.content);


        res.json({
            success: true,
            recommendations: response,
            metadata: {
                requestId,
                matchedProducts: records.length,
                processingTime: Date.now() - parseInt(requestId, 36)
            }
        });

    } catch (error) {
        console.error('\n=== Error Details ===', {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        res.status(500).json({
            error: 'Failed to generate recommendations',
            code: error.code || 'PROCESSING_ERROR',
            message: error.message
        });
    } finally {
        console.timeEnd(`request-${requestId}`);
        console.groupEnd();
    }

    // Sanitize incoming payload
    const sanitizedPayload = {
        skinType: req.body.skinType?.trim(),
        conditions: req.body.conditions?.trim(),
        concerns: req.body.concerns?.trim(),
        zones: req.body.zones?.trim(),
        treatment: req.body.treatment?.trim(),
        fragrance: req.body.fragrance?.trim(),
        routine: req.body.routine?.trim()
    };

    console.log('\n=== Sanitized Payload ===');
    console.log('Sanitized values:', sanitizedPayload);

    // Validate Airtable schema and field mapping
    const requiredFields = {
        'SkinType': 'skin type',
        'Conditions': 'conditions',
        'Concerns': 'concerns',
        'Zones': 'target areas',
        'Treatment': 'texture preference',
        'Fragrance': 'scent preference',
        'Routine': 'routine time',
        'Products': 'products',
        'Notes': 'additional notes'
    };

    // Log Airtable field structure
    console.log('\n=== Airtable Schema Validation ===');
    console.log('Required fields:', Object.keys(requiredFields));

    try {
        const table = base('Recommendations');
        const sample = await table.select({ maxRecords: 1 }).firstPage();
        const missingFields = [];

        if (sample && sample.length > 0) {
            const fields = sample[0].fields;
            for (const [field, label] of Object.entries(requiredFields)) {
                if (!(field in fields)) {
                    missingFields.push({ field, label });
                }
            }

            if (missingFields.length > 0) {
                console.error('Missing Airtable fields:', missingFields);
                throw new Error(`Missing required Airtable fields: ${missingFields.map(f => f.field).join(', ')}`);
            }
        }

    try {
        console.log('\n=== Processing User Data ===');
        const userData = {
            skinType: sanitizedPayload.skinType,
            conditions: sanitizedPayload.conditions,
            concerns: sanitizedPayload.concerns,
            zones: sanitizedPayload.zones,
            treatment: sanitizedPayload.treatment,
            fragrance: sanitizedPayload.fragrance,
            routine: sanitizedPayload.routine
        };

        // Validate each required field with specific messages
        const fieldMessages = {
            skinType: "Skin type is required. Please complete the skin type quiz.",
            conditions: "Skin conditions information is required. Please complete the conditions quiz.",
            concerns: "Skin concerns are required. Please complete the concerns quiz.",
            zones: "Treatment zones are required. Please complete the zones quiz.",
            treatment: "Treatment preference is required. Please complete the treatment quiz.",
            fragrance: "Fragrance preference is required. Please complete the fragrance quiz.",
            routine: "Routine preference is required. Please complete the routine quiz."
        };

        for (const [field, message] of Object.entries(fieldMessages)) {
            if (!userData[field]) {
                console.error(`Missing required field: ${field}`);
                return res.status(400).json({
                    error: message,
                    field,
                    code: 'MISSING_FIELD'
                });
            }
        }

        console.log("\n=== Querying Airtable ===");
        console.log('Querying Airtable with params:', userData);

        try {
            // Query Airtable with detailed logging
            console.log('\n=== Executing Airtable Query ===');
            console.log('Query parameters:', sanitizedPayload);

            // Fetch records with enhanced error handling
            let records;
            try {
                records = await retryOperation(async () => {
                  console.log('Fetching Airtable records...');
                  return await base('Recommendations')
                    .select({
                        filterByFormula: `AND(
                            OR(
                                LOWER(TRIM({SkinType})) = "${normalizeFieldValue(sanitizedPayload.skinType)}",
                                FIND("${normalizeFieldValue(sanitizedPayload.skinType)}", LOWER(TRIM({SkinType}))) > 0
                            ),
                            OR(
                                LOWER(TRIM({Conditions})) = "${normalizeFieldValue(sanitizedPayload.conditions)}",
                                FIND("${normalizeFieldValue(sanitizedPayload.conditions)}", LOWER(TRIM({Conditions}))) > 0
                            ),
                            OR(
                                LOWER(TRIM({Concerns})) = "${normalizeFieldValue(sanitizedPayload.concerns)}",
                                FIND("${normalizeFieldValue(sanitizedPayload.concerns)}", LOWER(TRIM({Concerns}))) > 0
                            ),
                            OR(
                                LOWER(TRIM({Zones})) = "${normalizeFieldValue(sanitizedPayload.zones)}",
                                FIND("${normalizeFieldValue(sanitizedPayload.zones)}", LOWER(TRIM({Zones}))) > 0
                            ),
                            OR(
                                LOWER(TRIM({Treatment})) = "${normalizeFieldValue(sanitizedPayload.treatment)}",
                                FIND("${normalizeFieldValue(sanitizedPayload.treatment)}", LOWER(TRIM({Treatment}))) > 0
                            ),
                            OR(
                                LOWER(TRIM({Fragrance})) = "${normalizeFieldValue(sanitizedPayload.fragrance)}",
                                FIND("${normalizeFieldValue(sanitizedPayload.fragrance)}", LOWER(TRIM({Fragrance}))) > 0
                            ),
                            OR(
                                LOWER(TRIM({Routine})) = "${normalizeFieldValue(sanitizedPayload.routine)}",
                                FIND("${normalizeFieldValue(sanitizedPayload.routine)}", LOWER(TRIM({Routine}))) > 0
                            )
                        )`
                    })
                    .all();
                });
            } catch (airtableError) {
                console.error('Airtable error:', airtableError);
                return res.status(500).json({
                    error: 'Failed to fetch recommendations',
                    code: 'AIRTABLE_ERROR',
                    details: airtableError.message
                });
            }


            // Log query results
            console.log('\n=== Airtable Query Results ===');
            console.log('Total records found:', records.length);
            console.log('First record sample:', records[0]?.fields);

            console.log('\n=== Airtable Query Results ===');
            console.log('Query matched records:', records.length);

            if (!records || records.length === 0) {
                return res.status(404).json({
                    error: "No matching recommendations found",
                    code: "NO_RECOMMENDATIONS"
                });
            }
            console.log("Airtable Records Retrieved:", records.map(record => record.fields));


            const openaiPrompt = `User Responses:
                SkinType: ${userData.skinType}
                Condition: ${userData.conditions}
                Concerns: ${userData.concerns}
                TexturePreference: ${userData.treatment}
                ScentPreference: ${userData.fragrance}
                RoutineTime: ${userData.routine}
                TargetAreas: ${userData.zones}
                Generate a response in this format:
                Produits:
                Nettoyage : 
                Eau florale : 
                Sérum : 
                Hydratant : 

                Routine:
                Matin :
                Nettoyage avec 
                Application d’

                Soir :
                Nettoyage avec 

                Résultat attendu : `;


            const openaiResponse = await retryOperation(async () => {
              console.log('Requesting OpenAI completion...');
              return await openai.chat.completions.create({
                messages: [{ role: "user", content: openaiPrompt }],
                model: "gpt-3.5-turbo",
                temperature: 0.7,
                max_tokens: 1000,
              });
            });

            console.log("OpenAI Response:", openaiResponse.choices[0].message.content)

            const recommendations = records.map(record => ({
                id: record.id,
                skinType: record.fields.SkinType,
                conditions: record.fields.Conditions,
                concerns: record.fields.Concerns,
                products: record.fields.Products || [],
                notes: record.fields.Notes || '',
                openaiResponse: openaiResponse.choices[0].message.content
            }));

            console.log("Recommendations found:", recommendations.length);
            res.json({ success: true, recommendations });

        } catch (error) {
            console.error("Error in /api/recommendations:", error);
            res.status(500).json({ error: error.message });
        } finally {
            console.timeEnd(`request-${requestId}`);
            console.groupEnd();
        }
    }
});

function validateAirtableRecord(record) {
    const validationResults = {
        isValid: true,
        missingFields: [],
        invalidValues: []
    };

    // Check required fields
    for (const [field, label] of Object.entries(requiredFields)) {
        if (!record.fields[field]) {
            validationResults.isValid = false;
            validationResults.missingFields.push(field);
        }
    }

    // Validate field values
    if (record.fields.Products && !Array.isArray(record.fields.Products)) {
        validationResults.isValid = false;
        validationResults.invalidValues.push('Products should be an array');
    }

    return validationResults;
}