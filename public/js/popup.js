window.onload = async () => {
    await initUI();
    initEvents();
}

/**
 * Initialize popup UI
 */
async function initUI() {
    const isPreventAutoPlayEnabled = await isPreventAutoPlay();
    const isShowRatingsEnabled     = await isShowRatings();
    const isShowTrailersEnabled    = await isShowTrailers();
    console.log(isPreventAutoPlayEnabled, isShowRatingsEnabled, isShowTrailersEnabled);
    $('.chk-prevent-auto-play').attr('checked', isPreventAutoPlayEnabled);
    $('.chk-show-ratings').attr('checked', isShowRatingsEnabled);
    $('.chk-show-trailers').attr('checked', isShowTrailersEnabled);
}

/**
 * Initialize event handlers
 */
function initEvents() {
    $('.chk-prevent-auto-play').change(onChangePreventAutoPlay);
    $('.chk-show-ratings').change(onChangeShowRatings);
    $('.chk-show-trailers').change(onChangeShowTrailers);
}

async function onChangePreventAutoPlay() {
    const checked = $(this).is(':checked');
    await setValueToStorage({ wp_prevent_auto_play: checked });
}

async function onChangeShowRatings() {
    const checked = $(this).is(':checked');
    await setValueToStorage({ wp_show_ratings: checked });
}

async function onChangeShowTrailers() {
    const checked = $(this).is(':checked');
    await setValueToStorage({ wp_show_trailers: checked });
}