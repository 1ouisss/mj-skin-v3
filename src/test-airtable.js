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

    // Format and validate records
    const formattedRecords = records.map(record => ({
      id: record.id,
      fields: record.fields
    }));

    console.log('\nFormatted Records:', formattedRecords);

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