/**
 * Event listener to handle message
 */
function handleMessage(message, sender, sendResponse) {
    if (message.action === 'TEST') {
        sendResponse({});
    }
}

/**
 * Send a message to background script
 * @param {string} message 
 * @param {object} data 
 */
function sendMessage(message, data) {
    chrome.runtime.sendMessage(message, data);
}

window.onload = async function() {
    Controls.init();
    Search.init();
    
    chrome.runtime.onMessage.addListener(handleMessage);
}