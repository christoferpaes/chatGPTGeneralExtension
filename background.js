chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "html_content") {
    sendToChatGPT(request.content, function(response) {
      sendResponse({ message: "chat_response", response: response });
    });
    return true;
  }
});

function sendToChatGPT(content, callback) {
  const apiKey = "YOUR_OPENAI_API_KEY";
  const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: content,
      max_tokens: 50
    })
  })
    .then(response => response.json())
    .then(data => {
      const chatResponse = data.choices[0].text.trim();
      callback(chatResponse);
    })
    .catch(error => {
      console.error("Error:", error);
      callback("An error occurred while processing the request.");
    });
}

