// content.js

// Function to extract the data from the webpage
function extractDataFromWebpage() {
  // Add your parsing logic here to extract the desired data from the webpage
  // Example:
  const dataElement = document.querySelector('.body');
  const data = dataElement ? dataElement.innerText : '';
  return data;
}

// Function to handle the response from ChatGPT
function handleChatGPTResponse(response) {
  // Process the response from ChatGPT and perform any necessary actions
  const generatedText = response.choices[0].message.content;
  const responseTextarea = document.getElementById('response-textarea');
  responseTextarea.value = generatedText;
  console.log('Generated Text:', generatedText);
}

// Function to send the generated text and query to ChatGPT
function sendToChatGPT(text, query, callback) {
  // Combine the generated text and query as the input messages
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: text },
    { role: 'assistant', content: query }
  ];

  // Make the API request to ChatGPT using the messages
  // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
  const apiKey = '';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages,
      max_tokens: 50
    })
  })
    .then(response => response.json())
    .then(data => {
      const chatResponse = data.choices[0].message.content;
      callback(chatResponse);
    })
    .catch(error => {
      console.error('Error:', error);
      callback('An error occurred while processing the request.');
    });
}

// Main function to initiate the process
function processWebpage() {
  const data = extractDataFromWebpage();

  // Use the extracted data as input for ChatGPT API
  // Example:
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const prompt = `Given the data: ${data}`;
  const dataToSend = {
    prompt,
    max_tokens: 50
  };

  const apiKey = ''; // Replace with your actual OpenAI API key
  // Send a request to the ChatGPT API
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(dataToSend)
  })
    .then(response => response.json())
    .then(handleChatGPTResponse)
    .catch(error => console.error('Error:', error));
}

// Call the main function to start the process when the webpage is loaded
processWebpage();
