function initSelect() {
  $('select.select2it').each(function () {
    $(this).next('.select2-container').remove();
    $(this).select2({
      theme: 'bootstrap',
      tags: true,
      allowClear: true,
      placeholder: 'Не задано',
      width: '100%',
    });
  });
}

$(() => {
  initSelect();
});

$(window).on('turbolinks:load', () => {
  initSelect();
});
