// Function to handle the received HTML code from the content script
function handleHTMLCode(htmlCode) {
  // Send the HTML code to ChatGPT for processing
  fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
    },
    body: JSON.stringify({
      prompt: htmlCode,
      max_tokens: 50
    })
  })
  .then(response => response.json())
  .then(data => {
    // Extract the generated completion from the response
    const completion = data.choices[0].text.trim();

    // Do whatever you want with the generated completion
    console.log(completion);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Check if the message contains the HTML code
  if (request.htmlCode) {
    // Call the function to handle the HTML code
    handleHTMLCode(request.htmlCode);
  }
});
// background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'html_content') {
    // Send the HTML content to ChatGPT and handle the response
    sendToChatGPT(request.content, function (response) {
      // Send the response back to the content script
      sendResponse({ message: 'chat_response', response: response });
    });

    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});

function sendToChatGPT(htmlContent, callback) {
  // Make the API request to ChatGPT using the HTML content
  // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
  const apiKey = 'YOUR_OPENAI_API_KEY';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: htmlContent,
      max_tokens: 50
    })
  })
    .then(response => response.json())
    .then(data => {
      const chatResponse = data.choices[0].text.trim();
      callback(chatResponse);
    })
    .catch(error => {
      console.error('Error:', error);
      callback('An error occurred while processing the request.');
    });
}
