function initSelect() {
  $('select.select2it').each(function () {
    $(this).next('.select2-container').remove();
    $(this).select2({
      theme: 'bootstrap-5',
      tags: true,
      allowClear: true,
      placeholder: 'Не задано',
      width: '100%',
    });
  });

  $('select.select2it').on('select2:unselect', (evt) => {
    if (!evt.params.originalEvent) {
      return;
    }

    evt.params.originalEvent.stopPropagation();
  });
}

$(() => {
  initSelect();
});

$(window).on('turbolinks:load', () => {
  initSelect();
});
