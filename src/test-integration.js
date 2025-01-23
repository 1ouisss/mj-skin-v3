
import dotenv from 'dotenv';
import Airtable from 'airtable';
import OpenAI from 'openai';
import { validateAirtableRecord, normalizeFieldValue } from './utils/airtable-validator.js';

dotenv.config();

const TEST_CASES = [
  {
    name: 'Basic Skincare Profile',
    input: {
      skinType: 'combination',
      conditions: 'acne',
      concerns: 'dark spots',
      zones: 'face',
      treatment: 'cream',
      fragrance: 'unscented',
      routine: '5-10min'
    }
  },
  {
    name: 'Complex Skincare Profile',
    input: {
      skinType: 'sensitive',
      conditions: 'rosacea',
      concerns: 'aging',
      zones: 'face,neck',
      treatment: 'serum',
      fragrance: 'natural',
      routine: '10-15min'
    }
  }
];

async function validateAirtableQueries(base, testCase) {
  console.group(`\n=== Testing Airtable Query: ${testCase.name} ===`);
  
  try {
    const records = await base('Recommendations')
      .select({
        filterByFormula: `AND(
          OR(LOWER(TRIM({SkinType})) = "${normalizeFieldValue(testCase.input.skinType)}",
             FIND(LOWER("${testCase.input.skinType}"), LOWER({SkinType})) > 0),
          OR(LOWER(TRIM({Conditions})) = "${normalizeFieldValue(testCase.input.conditions)}",
             FIND(LOWER("${testCase.input.conditions}"), LOWER({Conditions})) > 0)
        )`
      })
      .all();

    console.log('Query Results:', {
      count: records.length,
      fields: records[0] ? Object.keys(records[0].fields) : [],
      sample: records[0]?.fields
    });

    const validations = records.map(validateAirtableRecord);
    const invalidRecords = validations.filter(v => !v.isValid);

    if (invalidRecords.length > 0) {
      console.error('Invalid records found:', invalidRecords);
      return false;
    }

    return records;
  } catch (error) {
    console.error('Airtable query error:', error);
    return false;
  } finally {
    console.groupEnd();
  }
}

async function validateOpenAIResponse(openai, prompt) {
  console.group('\n=== Testing OpenAI Response ===');
  
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;
    const validation = {
      hasProducts: response.includes('Produits:'),
      hasRoutine: response.includes('Routine:'),
      hasMorning: response.includes('Matin:'),
      hasEvening: response.includes('Soir:'),
      hasResults: response.includes('Résultats attendus:')
    };

    console.log('Response Format Validation:', validation);
    return Object.values(validation).every(v => v) ? response : false;
  } catch (error) {
    console.error('OpenAI validation error:', error);
    return false;
  } finally {
    console.groupEnd();
  }
}

async function runIntegrationTests() {
  console.group('\n=== Running Full Integration Tests ===');
  console.time('full-test-suite');
  
  console.log('\n=== Environment Check ===');
  console.log('AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY ? 'Present' : 'Missing');
  console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID ? 'Present' : 'Missing');
  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const results = {
    total: TEST_CASES.length,
    passed: 0,
    failed: 0,
    errors: []
  };

  for (const testCase of TEST_CASES) {
    console.group(`\nTest Case: ${testCase.name}`);
    
    try {
      // 1. Validate Airtable Query
      console.log('\n=== Airtable Query Details ===');
      console.log('Test case:', testCase.name);
      console.log('Query parameters:', testCase.input);
      
      const airtableRecords = await validateAirtableQueries(base, testCase);
      console.log('\nAirtable Response:', {
        success: !!airtableRecords,
        recordCount: airtableRecords ? airtableRecords.length : 0,
        fields: airtableRecords?.[0]?.fields ? Object.keys(airtableRecords[0].fields) : []
      });
      
      if (!airtableRecords) {
        throw new Error('Airtable validation failed');
      }

      // 2. Generate and Test OpenAI Prompt
      const prompt = `Analyser le profil utilisateur suivant et générer des recommandations personnalisées:

Profil Principal:
- Type de peau: ${testCase.input.skinType}
- Conditions: ${testCase.input.conditions}
- Préoccupations: ${testCase.input.concerns}

Informations Secondaires:
- Zones ciblées: ${testCase.input.zones}
- Préférence de texture: ${testCase.input.treatment}
- Préférence de parfum: ${testCase.input.fragrance}
- Temps de routine: ${testCase.input.routine}

Produits disponibles:
${airtableRecords.map(r => r.fields.Products).flat().join(', ')}

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

      console.log('\n=== OpenAI Request Details ===');
      console.log('Prompt length:', prompt.length);
      console.log('Products included:', airtableRecords.length);
      
      const openAIResponse = await validateOpenAIResponse(openai, prompt);
      console.log('\nOpenAI Response:', {
        success: !!openAIResponse,
        length: openAIResponse?.length || 0,
        hasRequiredSections: openAIResponse ? 
          ['Produits:', 'Routine:', 'Matin:', 'Soir:'].every(section => 
            openAIResponse.includes(section)
          ) : false
      });
      
      if (!openAIResponse) {
        throw new Error('OpenAI validation failed');
      }

      results.passed++;
      console.log('Test passed successfully');

    } catch (error) {
      results.failed++;
      results.errors.push({
        testCase: testCase.name,
        error: error.message
      });
      console.error('Test failed:', error.message);
    } finally {
      console.groupEnd();
    }
  }

  console.log('\nTest Results:', results);
  console.timeEnd('full-test-suite');
  console.groupEnd();

  return results;
}

// Run the tests
runIntegrationTests()
  .then(results => {
    if (results.failed > 0) {
      console.error('Some tests failed:', results.errors);
      process.exit(1);
    }
    console.log('All tests passed successfully');
  })
  .catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
