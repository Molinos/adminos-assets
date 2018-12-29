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

$(function events() {
  const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|Android|Windows Phone|Opera Mobi)/i) != null;
  const hasTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

  $(document)
    .bind('ajaxStart turbolinks:request-start uploadStart', () => {
      $('#activity').show().spin(spinnerOpts);
    })
    .bind('ajaxStop turbolinks:request-end uploadStop', () => {
      $('#activity').hide().spin(false);
    });

  $(document).on('click', '.js-sidebar-toggle', (e) => {
    e.preventDefault();
    $('.page').toggleClass('sidebar-opened');
  });

  $(document).on('click', '.js-nav-group-toggle', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('opened');
  });

  $(document).on('click', '.nav__link', function () {
    $('.nav__item').removeClass('active');
    $(this).closest('.nav__item').addClass('active');
  });

  $(document).on('click', '.nav__link', function () {
    const group = $(this).closest('.nav__group');
    $('.nav__group').not(group).removeClass('opened');
  });

  $(document).on('change', '.uploader__check input', function () {
    const item = $(this).closest('.uploader__item');

    if ($(this).is(':checked')) {
      item.addClass('chosen');
    } else {
      item.removeClass('chosen');
    }
  });

  $(document).on('change', '.js-file input', function (e) {
    e.preventDefault();
    let file = this.value;


    const selected = this.nextElementSibling;
    file = file.replace(/.*[/\\]/, '');
    selected.textContent = file;
  });

  $(document).on('click', '.nav-tabs .nav-link, .nav-pills .nav-link', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  /*
  $(document).on('click', '.js-save-form', function(e) {
    e.preventDefault();
    var form = $(this).closest('form'),
        data = form.serialize();
    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      data: data,
      dataType: 'JSON'
    });
  });
  */

  $(document).ready(() => {
    const sidebarDropdown = $('.sidebar__header-content');


    const sidebarDropdownHeight = sidebarDropdown.height();
    sidebarDropdown.css('margin-top', -sidebarDropdownHeight);
  });

  $(window).on('load turbolinks:load', () => {
    $('.sidebar').find('.nav__group .nav__item.active').each(() => {
      const group = $(this).closest('.nav__group');
      group.addClass('opened initial');
      setTimeout(() => {
        group.removeClass('initial');
      }, 500);
    });
  });

  $(document).ready(() => {
    $('textarea').autosize();
  });

  $(window).on('turbolinks:load', () => {
    $('textarea').autosize();
    $('.with-nested-sortable > ul').withNestedSortable();
    $('.nested-list .add_fields')
      .data('association-insertion-method', 'append')
      .data('association-insertion-node', link => link.parents('.nested-list').find('.nested-node'));

    $('.sidebar .optiscroll').optiscroll({
      preventParentScroll: true,
      forceScrollbars: true,
    });

    if (isMobile) {
      $('body').addClass('mobile');
    } else {
      $('body').addClass('desktop');
    }

    if (hasTouch) {
      $('body').addClass('touch');
    } else {
      $('body').addClass('notouch');
    }
  });
});
