init();

/**
 * Initialization
 */
async function init() {
    setPopup('html/popup.html');
}

/**
 * Set extension popup
 */
function setPopup(popup) {
    chrome.browserAction.setPopup({popup: popup});
}