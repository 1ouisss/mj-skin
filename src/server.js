
const express = require('express');
const Airtable = require('airtable');
const OpenAI = require('openai');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

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

app.post('/openai/analyze', async (req, res) => {
  console.log('\n=== POST /openai/analyze ===');
  console.log('Request body:', req.body);
  
  try {
    const { userResponses } = req.body;
    console.log('Processing user responses:', userResponses);
    
    if (!userResponses) {
      console.error('Error: Missing user responses');
      return res.status(400).json({
        error: 'Missing user responses',
        code: 'MISSING_USER_RESPONSES'
      });
    }
    
    // Fetch relevant recommendations from Airtable
    console.log('Fetching Airtable recommendations for:', userResponses.skinType, userResponses.concerns);
    try {
      console.log('Querying Airtable with filter:', {
        skinType: userResponses.skinType,
        concerns: userResponses.concerns
      });
      
      const recommendations = await base('Recommendations')
        .select({
          filterByFormula: `AND(
            FIND("${userResponses.skinType}", {SkinType}),
            FIND("${userResponses.concerns}", {Concerns})
          )`
        }).all();
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
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1000,
      });
      console.log('OpenAI response:', {
        choices: completion.choices,
        usage: completion.usage
      });

      res.json({ 
        recommendations: completion.choices[0].message.content,
        success: true 
      });
    } catch (openaiError) {
      console.error('OpenAI error:', openaiError);
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
