function extractHTMLContent() {
  return document.documentElement.outerHTML;
}

function sendMessageToBackgroundScript(message, data, callback) {
  chrome.runtime.sendMessage({ message, data }, response => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      callback("");
    } else {
      callback(response);
    }
  });
}

function handleChatGPTResponse(response) {
  const generatedText = response;
  console.log("Generated Text:", generatedText);
  // Perform further actions with the generated text as needed
}

function processWebpage() {
  const htmlContent = extractHTMLContent();

  sendMessageToBackgroundScript("html_content", htmlContent, handleChatGPTResponse);
}

processWebpage();

