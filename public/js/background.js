init();

/**
 * Initialization
 */
async function init() {
    setPopup('html/popup.html');

    chrome.tabs.query({url: 'https://www.netflix.com/*'}, (tabs) => {
        for (const tab of tabs) {
            chrome.tabs.executeScript(tab.id, {
                file: 'vendors/jquery/jquery.min.js'
            });
            chrome.tabs.executeScript(tab.id, {
                file: 'js/content.js'
            });
        }
    });
}

/**
 * Set extension popup
 */
function setPopup(popup) {
    chrome.browserAction.setPopup({popup: popup});
}