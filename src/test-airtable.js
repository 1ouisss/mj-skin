
const fetch = require('node-fetch');

async function testAirtableConnection() {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

  console.log('Testing Airtable connection...');
  
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Recommendations`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Number of records:', data.records?.length);
    console.log('First record sample:', JSON.stringify(data.records[0], null, 2));
    
    return data;
  } catch (error) {
    console.error('Error testing Airtable connection:', error);
    throw error;
  }
}

testAirtableConnection();
