// openai.js

const openai = require('openai');

const openaiApiKey = '';

// Initialize the OpenAI API client
const openaiClient = new openai.OpenAIApi(openaiApiKey);

// Function to send a request to the ChatGPT API
async function sendRequestToChatGPT(prompt) {
  const model = 'davinci';
  const response = await openaiClient.ChatCompletion.create({
    model,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const { choices } = response.data;
  const generatedText = choices[0].message.content.trim();
  return generatedText;
}

// Export the function to be used in other modules
module.exports = { sendRequestToChatGPT };
