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

function injectCSS() {
    const style = document.createElement('link');
    style.href  = 'https://fonts.googleapis.com/css2?family=Material+Icons';
    style.rel   = 'stylesheet';
    document.head.appendChild(style);
}

window.onload = async function() {
    injectCSS();
    Controls.init();
    Search.init();
    
    chrome.runtime.onMessage.addListener(handleMessage);
}