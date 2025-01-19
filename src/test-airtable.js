import Airtable from 'airtable';
import dotenv from 'dotenv';

dotenv.config();

async function testAirtableConnection() {
  console.group('\n=== Testing Airtable Connection ===');
  console.time('test-duration');

  try {
    // Validate environment variables
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      throw new Error('Missing required environment variables: AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
    }

    // Initialize Airtable
    console.log('Initializing Airtable connection...');
    const base = new Airtable({ apiKey }).base(baseId);

    // Fetch records
    console.log('\nFetching records from Recommendations table...');
    const records = await base('Recommendations').select().all();

    console.log('\nRaw Response Sample:');
    console.log(JSON.stringify(records[0], null, 2));

    // Validate and format records
    const requiredFields = ['SkinType', 'Concerns', 'Products'];
    const formattedRecords = records.map((record, index) => {
      // Validate record structure
      if (!record || !record.fields) {
        console.warn(`Invalid record structure at index ${index}`);
        return null;
      }

      // Check for missing required fields
      const missingFields = requiredFields.filter(field => !record.fields[field]);
      if (missingFields.length > 0) {
        console.warn(`Record ${record.id} missing required fields:`, missingFields);
        return null;
      }

      // Type validation (Removed redundant type checking as it's already handled in the later logic)

      // Format record
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
      };
    }).filter(Boolean);

    // Log results
    console.log('\nValidation Summary:');
    console.log({
      totalRecords: records.length,
      validRecords: formattedRecords.length,
      invalidRecords: records.length - formattedRecords.length
    });

    console.log('\nFormatted Record Sample:');
    console.log(JSON.stringify(formattedRecords[0], null, 2));

    console.timeEnd('test-duration');
    console.groupEnd();

    return { success: true, data: formattedRecords };

  } catch (error) {
    console.error('\nAirtable Test Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    console.timeEnd('test-duration');
    console.groupEnd();
    throw error;
  }
}

// Run the test
testAirtableConnection()
  .then(result => console.log('\nTest completed successfully'))
  .catch(error => console.error('\nTest failed:', error.message));