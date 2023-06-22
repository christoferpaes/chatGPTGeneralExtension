// Function to send the HTML code to the background script
function sendHTMLCode() {
  // Get the HTML code of the webpage
  var htmlCode = document.documentElement.outerHTML;

  // Send the HTML code to the background script
  chrome.runtime.sendMessage({ htmlCode: htmlCode });
}

// Call the function to send the HTML code when the content script is injected
sendHTMLCode();
