async function initUI() {
    const container       = document.createElement('div');
    container.classList.add('wp-wrapper');
    const style           = document.createElement('link');
    style.href            = 'https://fonts.googleapis.com/css2?family=Material+Icons';
    style.rel             = 'stylesheet';
    const playerContainer = $('.nf-player-container');

    if (playerContainer.length === 0) {
        return;
    }

    document.head.appendChild(style);
    playerContainer.append(container);

    await Controls.init();
}

function initEvents() {
    chrome.runtime.onMessage.addListener(handleMessage);
}

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
    init();
}

function init() {
    setInterval(async () => {
        if ($('.nf-player-container')[0] && 
            !$('.motion-background-component')[0] && 
            !$('.wp-wrapper')[0]) 
        {
            await initUI();
            initEvents();
        }
    }, 1000);
}