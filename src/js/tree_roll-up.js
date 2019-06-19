$(document).ready(function () {
  const parentNode = $('div.list-item');

  $('div.list-item').on('click', function (e) {
    e.stopPropagation();
    // console.log('meow!');
    console.log('tree-roll-up.js 1');
    $(this).siblings('ul').addClass('list__list');
    $(this).siblings('ul.list__list').slideToggle();
  });

  $('.list-item *').on('click', function (e) {
    console.log('tree-roll-up.js 2');
    e.stopPropagation();
  });
});
