const Controls = {
    degreeRotate: 0,
    degreeFlip: 0,
    zoomLevel: 1.0,
    spinInterval: null,
    self: null,
    init: async function() {
        await this.initUI();
        this.initEvents();
        self = this;
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
        $('.wp-btn-rotate').click(this.onClickBtnRotate);
        $('.wp-btn-spin').click(this.onClickBtnSpin);
        $('.wp-btn-flip').click(this.onClickBtnFlip);
        $('.wp-btn-zoom-in').click(this.onClickBtnZoomIn);
        $('.wp-btn-zoom-out').click(this.onClickBtnZoomOut);
        $('.wp-btn-reset-rsfz').click(this.onClickBtnResetRSFZ);
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
            y = y - 10;
        } else if (target === 'left') {
            x = x - 10;
        } else if (target === 'right') {
            x = x + 10;
        } else if (target === 'down') {
            y = y + 10;
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
    },
    /**
     * Event when click rotate button
     */
    onClickBtnRotate: function() {
        if (self.degreeRotate >= 345) {
            self.degreeRotate = 0;
        } else {
            self.degreeRotate += 15;
        }

        rotate(self.degreeRotate, ScaleMap[self.degreeRotate]);
    },
    /**
     * Event when click spin button
     */
    onClickBtnSpin: function() {
        if (self.spinInterval) {
            return;
        }

        self.spinInterval = setInterval(function() {
            self.degreeRotate += 15;
            rotate(self.degreeRotate, ScaleMap[self.degreeRotate]);
        }, 500);
    },
    /**
     * Event when click flip button
     */
    onClickBtnFlip: function() {
        self.degreeFlip += 180;
        flip(self.degreeFlip);
    },
    /**
     * Event when click zoom in button
     */
    onClickBtnZoomIn: function() {
        self.zoomLevel += 0.1;
        zoom(self.zoomLevel);
    },
    /**
     * Event when click zoom out button
     */
    onClickBtnZoomOut: function() {
        self.zoomLevel -= 0.1;
        zoom(self.zoomLevel);
    },
    /**
     * Event when click reset button in RSFZ
     */
    onClickBtnResetRSFZ: function() {
        clearInterval(self.spinInterval);

        self.degreeRotate = 0;
        self.degreeFlip   = 0;
        self.zoomLevel    = 1.0;
        self.spinInterval = null;

        rotate(self.degreeRotate, self.zoomLevel);
        flip(self.degreeFlip);
    },
};