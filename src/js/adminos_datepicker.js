function initDatePicker() {
  $('.date-picker').datepicker({
    format: 'yyyy-mm-dd',
    language: 'ru',
    todayHighlight: true,
    startDate: '1999-01-01',
    endDate: '+1m',
  })
    .on('changeDate', (e) => {
      $('.input-date-field input').val(e.date);
    });
}

function setDate() {
  const postDate = $('.input-date-field input').val();
  $('.date-picker').datepicker('setDate', postDate);
}

$(() => {
  initDatePicker();
});

$(window).on('turbolinks:load', () => {
  initDatePicker();
  setDate();
});
