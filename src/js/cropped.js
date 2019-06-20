import Cropper from 'cropperjs';

(function ($) {
  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img[data-toggle="cropp"]');

    images.forEach(img => {
      let crop_coord = document.querySelector('input[name*="' + img.dataset.coord + '"]');
      const preview_class = img.dataset.preview;
      const aspectRatio = img.dataset.aspectRatio
      const widthInput = img.closest('.cropp').querySelector('input[name="width"]');
      const heightInput = img.closest('.cropp').querySelector('input[name="height"]');

      const cropper = new Cropper(img, {
        aspectRatio: aspectRatio,
        preview: preview_class,
        maxContainerWidth: '200px',
        ready(event) {
          const array = crop_coord.value.split(/x|\+/);
          const width = array[0],
            height = array[1],
            x = array[2],
            y = array[3];

          if (width && height && x && y) {
            cropper.setData({
              width: Math.round(width),
              height: Math.round(height),
              x: Math.round(x),
              y: Math.round(y)
            })
          }
        },
        crop(event) {
          widthInput.value = Math.round(event.detail.width);
          heightInput.value = Math.round(event.detail.height);
        },
        cropend(event) {

          const detail = cropper.getData();

          const width = Math.round(detail.width);
          const height = Math.round(detail.height);
          const x = Math.round(detail.x);
          const y = Math.round(detail.y);

          crop_coord.value = width + 'x' + height + '+' + x + '+' + y;
        },
      });

      widthInput.addEventListener('change', e => {
        console.log('change', e.currentTarget.value);

        cropper.setData({
          width: Math.round(e.currentTarget.value)
        });
      });

      heightInput.addEventListener('change', e => {
        console.log('change', e.currentTarget.value);

        cropper.setData({
          height: Math.round(e.currentTarget.value)
        });
      });

    });
  });
})();
