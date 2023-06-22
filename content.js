// Function to send the HTML code to the background script
function sendHTMLCode() {
  // Get the HTML code of the webpage
  var htmlCode = document.documentElement.outerHTML;

  // Send the HTML code to the background script
  chrome.runtime.sendMessage({ htmlCode: htmlCode });
}

// Call the function to send the HTML code when the content script is injected
sendHTMLCode();
// content.js

// Create a chat window container
const chatWindowContainer = document.createElement('div');
chatWindowContainer.id = 'chat-window-container';

// Create the chat window header
const chatWindowHeader = document.createElement('div');
chatWindowHeader.id = 'chat-window-header';
chatWindowHeader.textContent = 'Chat with ChatGPT';

// Create the chat window body
const chatWindowBody = document.createElement('div');
chatWindowBody.id = 'chat-window-body';

// Create the chat input field
const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.id = 'chat-input';
chatInput.placeholder = 'Type your message...';

// Append the header and body to the container
chatWindowContainer.appendChild(chatWindowHeader);
chatWindowContainer.appendChild(chatWindowBody);
chatWindowContainer.appendChild(chatInput);

// Append the chat window container to the webpage
document.body.appendChild(chatWindowContainer);

// Event listener for sending chat messages
chatInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const message = chatInput.value;
    displayChatMessage('User', message);
    sendMessageToBackgroundScript(message);
    chatInput.value = '';
  }
});

// Event listener for receiving chat responses
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'chat_response') {
    const response = request.response;
    displayChatMessage('ChatGPT', response);
  }
});

// Function to send chat message to the background script
function sendMessageToBackgroundScript(message) {
  chrome.runtime.sendMessage({ message: 'chat_message', content: message });
}

// Function to display chat messages in the chat window
function displayChatMessage(sender, message) {
  const chatMessage = document.createElement('div');
  chatMessage.textContent = `${sender}: ${message}`;
  chatWindowBody.appendChild(chatMessage);
  chatWindowBody.scrollTop = chatWindowBody.scrollHeight;
}
