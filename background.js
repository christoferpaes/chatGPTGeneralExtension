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
