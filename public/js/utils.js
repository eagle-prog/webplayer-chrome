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

/**
 * Check if `prevent video auto play` is enabled
 */
async function isPreventAutoPlay() {
    const data = await getValueFromStorage('wp_prevent_auto_play');
    return data;
}

/**
 * Check if `show ratings` is enabled
 */
async function isShowRatings() {
    const data = await getValueFromStorage('wp_show_ratings');
    return data;
}

/**
 * Check if `show trailers` is enabled
 */
async function isShowTrailers() {
    const data = await getValueFromStorage('wp_show_trailers');
    return data;
}