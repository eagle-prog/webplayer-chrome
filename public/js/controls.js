const Controls = {
    init: async function() {
        await this.initUI();
        this.initEvents();
    },
    initUI: async function() {
        await loadHTML('.wp-wrapper', 'html/controls.html');
    },
    initEvents: function() {
        $('.wp-btn-shortcut').click(this.onClickBtnShortcut);
    },
    /**
     * Event when click shortcut icon
     */
    onClickBtnShortcut: function() {
        const target   = $(`#${$(this).data('target')}`);
        const isHidden = target.hasClass('wp-d-none');
        console.log(target, isHidden);
        $('.wp-controls-detail').addClass('wp-d-none');
        $('.wp-btn-shortcut').css('margin-top', '0px');

        if (isHidden) {
            target.removeClass('wp-d-none');
            $(this).css('margin-top', '-15px');
        }
    }
};