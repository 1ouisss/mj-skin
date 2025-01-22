const express = require("express");
const Airtable = require("airtable");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Server is running correctly!");
});

// Recommendations Route
app.post("/api/recommendations", async (req, res) => {
  const requestId = Math.random().toString(36).substring(7);
  console.group(`=== /api/recommendations Request (ID: ${requestId}) ===`);
  console.time(`request-${requestId}-duration`);

  try {
    // Log incoming request details
    console.log('📥 Incoming Request:', {
      id: requestId,
      timestamp: new Date().toISOString(),
      body: req.body,
      headers: req.headers,
      ip: req.ip
    });

    // Validate required fields
    const requiredFields = ['skinType', 'conditions', 'concerns'];
    const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field].trim() === '');

    if (missingFields.length > 0) {
      console.warn('❌ Validation Error:', {
        missingFields,
        receivedPayload: req.body
      });
      return res.status(400).json({
        error: 'Validation Error',
        message: `Missing required fields: ${missingFields.join(', ')}`,
        receivedFields: Object.keys(req.body)
      });
    }

    const { skinType, conditions, concerns } = req.body;

    // Validate field values are strings
    for (const [field, value] of Object.entries({ skinType, conditions, concerns })) {
      if (typeof value !== 'string') {
        return res.status(400).json({
          error: 'Invalid Data Type',
          message: `Field '${field}' must be a string, received ${typeof value}`
        });
      }
    }

    // Validate payload
    const requiredFields = ['skinType', 'conditions', 'concerns'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      console.warn('Validation Error:', {
        missingFields,
        receivedPayload: req.body
      });
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
        receivedFields: Object.keys(req.body)
      });
    }

    // Query Airtable
    console.log('🔍 Querying Airtable with criteria:', {
      skinType,
      conditions,
      concerns,
      filterFormula: `AND(
        LOWER(TRIM({SkinType})) = LOWER("${skinType}"),
        LOWER(TRIM({Conditions})) = LOWER("${conditions}"),
        LOWER(TRIM({Concerns})) = LOWER("${concerns}")
      )`,
      timestamp: new Date().toISOString()
    });

    console.log('📊 Raw Request Body:', req.body);
    console.log('🔑 Headers Present:', Object.keys(req.headers));

    const records = await base("Recommendations")
      .select({
        filterByFormula: `AND(
          LOWER(TRIM({SkinType})) = LOWER("${skinType}"),
          LOWER(TRIM({Conditions})) = LOWER("${conditions}"),
          LOWER(TRIM({Concerns})) = LOWER("${concerns}")
        )`,
      })
      .all();

    console.log('📊 Airtable Query Results:', {
      recordsFound: records.length,
      fields: records.length > 0 ? Object.keys(records[0].fields) : [],
      timestamp: new Date().toISOString()
    });

    if (!records.length) {
      console.warn('❌ No matching recommendations found in Airtable:', {
        searchCriteria: { skinType, conditions, concerns },
        timestamp: new Date().toISOString()
      });
      return res.status(404).json({
        error: "Not Found",
        message: "No matching recommendations found for the provided criteria.",
        searchCriteria: { skinType, conditions, concerns }
      });
    }

    // Prepare data for OpenAI
    const airtableData = records.map((record) => record.fields);

    const prompt = `As a skincare expert, analyze the following profile and provide detailed recommendations:

USER PROFILE
-----------
Skin Type: ${skinType}
Conditions: ${conditions}
Concerns: ${concerns}

AVAILABLE PRODUCTS (from verified database)
----------------------------------------
${airtableData.map(record => `- ${record.Products || []}`).join('\n')}

INSTRUCTIONS
-----------
Provide a detailed analysis and recommendations in the following format:

1. SKIN TYPE ANALYSIS
- Current skin condition
- Specific characteristics
- Key challenges

2. MAIN CONCERNS
- Primary issues analysis
- Contributing factors
- Treatment priorities

3. RECOMMENDED PRODUCTS
- Cleanser: [specific product] - [reason for recommendation]
- Treatment: [specific product] - [reason for recommendation]
- Moisturizer: [specific product] - [reason for recommendation]
- Additional products if needed

4. DAILY ROUTINE
Morning:
1. [step-by-step instructions]
2. [product application methods]
3. [timing and frequency]

Evening:
1. [step-by-step instructions]
2. [product application methods]
3. [special considerations]

Important: Focus on gentle, effective solutions that address the specific combination of ${skinType} skin type with ${conditions} and ${concerns}.`;

    console.log('🤖 Sending prompt to OpenAI:', {
      promptLength: prompt.length,
      model: "gpt-3.5-turbo",
      timestamp: new Date().toISOString()
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('✨ OpenAI Response:', {
      status: 'success',
      completionId: completion.id,
      modelUsed: completion.model,
      responseLength: completion.choices[0].message.content.length,
      finishReason: completion.choices[0].finish_reason,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      recommendations: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('❌ Error in /api/recommendations:', {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    const statusCode = error.status || 500;
    res.status(statusCode).json({
      error: "Internal Server Error",
      details: error.message,
    });
  } finally {
    console.timeEnd(`request-${requestId}-duration`);
    console.groupEnd();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});