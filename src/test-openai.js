import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testOpenAIIntegration() {
  console.group('\n=== Testing OpenAI Integration ===');
  console.time('test-duration');

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const testCases = [
    {
      name: 'Basic skincare recommendation',
      userResponses: {
        skinType: 'combination',
        concerns: ['acne', 'dryness'],
        currentRoutine: ['cleanser', 'moisturizer']
      }
    },
    {
      name: 'Complex recommendation',
      userResponses: {
        skinType: 'sensitive',
        concerns: ['rosacea', 'aging'],
        currentRoutine: ['cleanser', 'serum', 'sunscreen']
      }
    }
  ];

  for (const testCase of testCases) {
    console.group(`\nTest Case: ${testCase.name}`);
    let attempt = 0;
    let success = false;

    while (attempt < MAX_RETRIES && !success) {
      try {
        console.log(`Attempt ${attempt + 1}/${MAX_RETRIES}`);

        const prompt = `Based on the following user responses, provide personalized skincare advice:
          User Profile:
          ${JSON.stringify(testCase.userResponses, null, 2)}
          
          Please provide recommendations in the following format:
          1. Skin Type Analysis
          2. Main Concerns
          3. Recommended Products
          4. Daily Routine`;

        console.log('\nRequest Payload:', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1000
        });

        const startTime = Date.now();
        const completion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 1000,
        });

        console.log('\nResponse Metrics:', {
          duration: `${Date.now() - startTime}ms`,
          status: 'success',
          usage: completion.usage,
          modelUsed: completion.model,
          choicesCount: completion.choices.length
        });

        console.log('\nResponse Content:', completion.choices[0].message.content);
        success = true;

      } catch (error) {
        console.error('\nError Details:', {
          name: error.name,
          message: error.message,
          status: error.status || 'N/A',
          code: error.code || 'N/A'
        });

        if (error.status === 429) {
          console.log('Rate limit exceeded. Waiting before retry...');
          await sleep(RETRY_DELAY * (attempt + 1));
        } else if (error.status >= 500) {
          console.log('Server error. Retrying...');
          await sleep(RETRY_DELAY);
        } else if (error.code === 'insufficient_quota') {
          console.error('API quota exceeded');
          break;
        } else {
          console.error('Unhandled error:', error);
          break;
        }

        attempt++;
      }
    }

    if (!success) {
      console.error(`Failed all ${MAX_RETRIES} attempts for test case: ${testCase.name}`);
    }
    console.groupEnd();
  }

  console.timeEnd('test-duration');
  console.groupEnd();
}

// Run the tests
testOpenAIIntegration()
  .then(() => console.log('\nTest suite completed'))
  .catch(error => console.error('\nTest suite failed:', error));