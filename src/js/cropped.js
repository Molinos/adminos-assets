import Cropper from 'cropperjs';

(function ($) {
  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img[data-toggle="cropp"]');

    images.forEach(img => {
      let crop_coord = document.querySelector('input[name*="' + img.dataset.coord + '"]');
      const preview_class = img.dataset.preview;
      const aspectRatio = img.dataset.aspectRatio

      const cropper = new Cropper(img, {
        aspectRatio: aspectRatio,
        preview: preview_class,
        maxContainerWidth: '200px',
        crop(event) {

          const width = Math.round(event.detail.width);
          const height = Math.round(event.detail.height);
          const x = Math.round(event.detail.x);
          const y = Math.round(event.detail.y);

          crop_coord.value = width + 'x' + height + '+' + x + '+' + y;
        },
      });
    });
  });
})();