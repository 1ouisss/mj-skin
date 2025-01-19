
const OpenAI = require('openai');
require('dotenv').config();

async function testOpenAIIntegration() {
  console.log('Testing OpenAI Integration...');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  // Sample quiz data
  const sampleUserResponses = {
    skinType: 'combination',
    concerns: ['acne', 'dryness'],
    currentRoutine: ['cleanser', 'moisturizer']
  };

  const prompt = `Based on the following user responses, provide personalized skincare advice:
    User Profile:
    ${JSON.stringify(sampleUserResponses, null, 2)}
    
    Please provide recommendations in the following format:
    1. Skin Type Analysis
    2. Main Concerns
    3. Recommended Products
    4. Daily Routine`;

  try {
    console.log('Sending request to OpenAI...');
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('\nOpenAI Response:');
    console.log('Status: Success');
    console.log('Response content:', completion.choices[0].message.content);
    console.log('Usage:', completion.usage);
  } catch (error) {
    console.error('\nOpenAI Error:', {
      name: error.name,
      message: error.message,
      status: error.status,
      response: error.response?.data
    });
  }
}

testOpenAIIntegration();
