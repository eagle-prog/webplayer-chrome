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
        $('.wp-btn-reset-bsc').click(this.onClickResetBSC);
        $('#wp-controls-bsc .slider').change(this.onChangeBSC);
        $('#wp-control-speed-rate').change(this.onChangeSpeedInput);
        $('#wp-control-speed-slider').change(this.onChangeSpeedSlider);
        $('.wp-btn-control-cvp').click(this.onClickBtnCVP);
        $('.wp-control-cvp-position').change(this.onChangeCVPInput);
    },
    /**
     * Event when click reset button in brightness, saturation, contrast
     */
    onClickResetBSC: function() {
        changeBSC({
            brightness : 100,
            saturation : 100,
            contrast  : 100,
        });

        $('#wp-control-brightness').val(100);
        $('#wp-control-saturation').val(100);
        $('#wp-control-contrast').val(100);
    },
    /**
     * Event when change brightness, saturation, contrast
     */
    onChangeBSC: function() {
        const brightness = $('#wp-control-brightness').val();
        const saturation = $('#wp-control-saturation').val();
        const contrast   = $('#wp-control-contrast').val();

        changeBSC({ brightness, saturation, contrast });
    },
    /**
     * Event when playback speed input changed
     */
    onChangeSpeedInput: function(e) {
        let speed = $(this).val();

        if (speed > 20) {
            speed = 20;
            $(this).val(20);
        }

        $('#wp-control-speed-slider').val(speed);
        changePS(speed);
    },
    /**
     * Event when playback speed slider changed
     */
    onChangeSpeedSlider: function() {
        const speed = $(this).val();
        $('#wp-control-speed-rate').val(speed);
        changePS(speed);
    },
    /**
     * Event when click shortcut icon
     */
    onClickBtnShortcut: function() {
        const target   = $(`#${$(this).data('target')}`);
        const isHidden = target.hasClass('wp-d-none');

        $('.wp-controls-detail').addClass('wp-d-none');
        $('.wp-btn-shortcut').css('margin-top', '0px');

        if (isHidden) {
            target.removeClass('wp-d-none');
            $(this).css('margin-top', '-15px');
        }
    },
    /**
     * Event when click buttons in Change Video Position
     */
    onClickBtnCVP: function() {
        let x        = Number($('#wp-control-cvp-x').val());
        let y        = Number($('#wp-control-cvp-y').val());
        const target = $(this).data('target');

        if (target === 'up') {
            x = x - 10;
        } else if (target === 'left') {
            y = y - 10;
        } else if (target === 'right') {
            y = y + 10;
        } else if (target === 'down') {
            x = x + 10;
        }

        $('#wp-control-cvp-x').val(x);
        $('#wp-control-cvp-y').val(y);
        changeCVP(x, y);
    },
    /**
     * Event when x or y postion has been changed
     */
    onChangeCVPInput: function() {
        const x = Number($('#wp-control-cvp-x').val());
        const y = Number($('#wp-control-cvp-y').val());
        changeCVP(x, y);
    }
};