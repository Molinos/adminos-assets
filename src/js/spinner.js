import Spinner from 'spin/dist/spin.min';

const spinnerOpts = {
  lines: 11,
  length: 5,
  width: 2,
  radius: 5,
  corners: 1,
  rotate: 0,
  color: '#fff',
  speed: 1,
  trail: 50,
  shadow: false,
  hwaccel: false,
  className: 'spinner',
  zIndex: 1000,
  top: 'auto',
  left: 'auto',
};

$(() => {
  $.fn.spin = function () {
    this.each(function () {
      const $this = $(this);

      const data = $this.data();
      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (spinnerOpts !== false) {
        data.spinner = new Spinner($.extend({
          color: $this.css('color'),
        }, spinnerOpts)).spin(this);
      }
    });

    return this;
  };
});
