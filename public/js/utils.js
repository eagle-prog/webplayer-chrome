/**
 * Load html content to DOM element specified with selector
 * @param {string} selector 
 * @param {string} url 
 */
function loadHTML(selector, url) {
    return new Promise((resolve) => {
        $(selector).load(chrome.extension.getURL(url), () => {
            resolve();
        });
    });
}

/**
 * Load javascript content
 * @param {string} url 
 */
function loadJS(url) {
    return new Promise((resolve) => {
        const element = document.createElement('script');
        element.type  = 'application/javascript';
        element.src   = chrome.extension.getURL(url);
        document.body.appendChild(element);
        setTimeout(() => {
            resolve();
        }, 100);
    });
}