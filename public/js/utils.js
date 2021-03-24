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

/**
 * Change brightness, saturation, contrast of all videos in a page
 * @param {object} data 
 */
function changeBSC(data) {
    const str    = `brightness(${data.brightness}%) ` + 
                   `contrast(${data.contrast}%) ` + 
                   `saturate(${data.saturation}%) ` + 
                   `hue-rotate(0deg) sepia(0) grayscale(0)`;
    const css    = `video{filter : ${str} !important}`;
    const videos = document.querySelectorAll('video');
    const style  = document.createElement('style');

    for (const video of videos) {
        video.style.setProperty('filter', str, 'important');
        console.log(video.style.getPropertyValue('filter'));
    }

    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    
    
}