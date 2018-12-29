"use strict";

$(function () {
  $('form a.submit-form, form input.delete-button, form.remote button').on('click', function (event) {
    event.preventDefault();
    var form = $(this).parents('form');
    var confirmMessage = form.find('.confirm-message');

    if (confirmMessage.length > 0) {
      if (!confirm(confirmMessage.val())) {
        return false;
      }
    }

    form.submit();
    return false;
  });
});
"use strict";

function initDatePicker() {
  $('.date-picker').datepicker({
    format: 'yyyy-mm-dd',
    language: 'ru',
    todayHighlight: true,
    startDate: '1999-01-01',
    endDate: '+1m'
  }).on('changeDate', function (e) {
    $('.input-date-field input').val(e.date);
  });
}

function setDate() {
  var postDate = $('.input-date-field input').val();
  $('.date-picker').datepicker('setDate', postDate);
}

$(function () {
  initDatePicker();
});
$(window).on('turbolinks:load', function () {
  initDatePicker();
  setDate();
});
"use strict";

function initSelect() {
  $('select.select2it').each(function () {
    $(this).next('.select2-container').remove();
    $(this).select2({
      theme: 'bootstrap',
      tags: true,
      allowClear: true,
      placeholder: 'Не задано',
      width: '100%'
    });
  });
}

$(function () {
  initSelect();
});
$(window).on('turbolinks:load', function () {
  initSelect();
});
"use strict";

var _cropperjs = _interopRequireDefault(require("cropperjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($) {
  document.addEventListener("DOMContentLoaded", function () {
    var images = document.querySelectorAll('img[data-toggle="cropp"]');
    images.forEach(function (img) {
      var crop_coord = document.querySelector('input[name*="' + img.dataset.coord + '"]');
      var preview_class = img.dataset.preview;
      var aspectRatio = img.dataset.aspectRatio;
      var cropper = new _cropperjs.default(img, {
        aspectRatio: aspectRatio,
        preview: preview_class,
        maxContainerWidth: '200px',
        crop: function crop(event) {
          var width = Math.round(event.detail.width);
          var height = Math.round(event.detail.height);
          var x = Math.round(event.detail.x);
          var y = Math.round(event.detail.y);
          crop_coord.value = width + 'x' + height + '+' + x + '+' + y;
        }
      });
    });
  });
})();
"use strict";

var spinnerOpts = {
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
  left: 'auto'
};
$(function events() {
  var _this = this;

  var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|Android|Windows Phone|Opera Mobi)/i) != null;
  var hasTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  $(document).bind('ajaxStart turbolinks:request-start uploadStart', function () {
    $('#activity').show().spin(spinnerOpts);
  }).bind('ajaxStop turbolinks:request-end uploadStop', function () {
    $('#activity').hide().spin(false);
  });
  $(document).on('click', '.js-sidebar-toggle', function (e) {
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
    var group = $(this).closest('.nav__group');
    $('.nav__group').not(group).removeClass('opened');
  });
  $(document).on('change', '.uploader__check input', function () {
    var item = $(this).closest('.uploader__item');

    if ($(this).is(':checked')) {
      item.addClass('chosen');
    } else {
      item.removeClass('chosen');
    }
  });
  $(document).on('change', '.js-file input', function (e) {
    e.preventDefault();
    var file = this.value;
    var selected = this.nextElementSibling;
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

  $(document).ready(function () {
    var sidebarDropdown = $('.sidebar__header-content');
    var sidebarDropdownHeight = sidebarDropdown.height();
    sidebarDropdown.css('margin-top', -sidebarDropdownHeight);
  });
  $(window).on('load turbolinks:load', function () {
    $('.sidebar').find('.nav__group .nav__item.active').each(function () {
      var group = $(_this).closest('.nav__group');
      group.addClass('opened initial');
      setTimeout(function () {
        group.removeClass('initial');
      }, 500);
    });
  });
  $(document).ready(function () {
    $('textarea').autosize();
  });
  $(window).on('turbolinks:load', function () {
    $('textarea').autosize();
    $('.with-nested-sortable > ul').withNestedSortable();
    $('.nested-list .add_fields').data('association-insertion-method', 'append').data('association-insertion-node', function (link) {
      return link.parents('.nested-list').find('.nested-node');
    });
    $('.sidebar .optiscroll').optiscroll({
      preventParentScroll: true,
      forceScrollbars: true
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
"use strict";

$(function sort() {
  $('.with-nested-sortable > ul').withNestedSortable();
  $('a.ajax-post').ajaxRequestLink();
  $('a.ajax-delete').ajaxRequestLink({
    method: 'delete'
  });
  $('form.method-link-to').addLinkToSubmitForm(); // Togglable tabs <http://twitter.github.com/bootstrap/javascript.html#tabs>.

  $('.with-togglable-navigation .active a').tab('show');
  $('.with-togglable-navigation a').click(function (event) {
    event.preventDefault();
    $(this).tab('show');
  });
  $('.with-togglable-navigation *[data-toggle]').on('shown', function (event) {
    $(event.target).addClass('active'); // activated tab
    // event.relatedTarget; // previous tab
  });
  $('.with-move-to').sortable({
    handle: '.icon-move',
    stop: function stop(event, ui) {
      var to = ui.item.prev().data('id');
      var url = ui.item.data('href');
      $.post(url, {
        to: to
      });
    }
  });
  $('.with-apply-sortable-order[data-sortable]').sortable({
    opacity: 0.6,
    helper: function helper(event, el) {
      var content = '';
      var img = $(el).find('.sortable-helper');

      if (img.length > 0) {
        content = "<img src=\"".concat($(img).attr('src'), "\"/>");
      } else {
        content = $(el).attr('data-placeholder');
      }

      return "<div class=\"helper\" style=\"width: auto; height: auto\">".concat(content, "</div>");
    },
    appendTo: 'body',
    handler: 'icon-move',
    items: $(this).attr('items'),
    stop: function stop() {
      var url = $(this).attr('data-sortable');

      if (url) {
        var ids = $.map($(this).children(), function (e) {
          return $(e).attr('data-id');
        });
        $.ajax({
          type: 'post',
          dataType: 'script',
          data: {
            id: ids
          },
          url: url
        });
      }
    }
  });
});
"use strict";

var _spin = _interopRequireDefault(require("spin/dist/spin.min"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spinnerOpts = {
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
  left: 'auto'
};
$(function () {
  $.fn.spin = function () {
    this.each(function () {
      var $this = $(this);
      var data = $this.data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }

      if (spinnerOpts !== false) {
        data.spinner = new _spin.default($.extend({
          color: $this.css('color')
        }, spinnerOpts)).spin(this);
      }
    });
    return this;
  };
});
"use strict";

$.fn.withNestedSortable = function (options) {
  var defaults = $.extend({}, $.fn.withNestedSortable.defaults, {
    maxLevels: $(this).attr('max-levels')
  });
  var settings = $.extend({}, defaults, options);
  $(this).nestedSortable({
    listType: 'ul',
    opacity: 0.8,
    items: 'li',
    tabSize: 32,
    maxLevels: settings.maxLevels,
    disableNesting: 'no-nesting',
    forcePlaceholderSize: true,
    placeholder: 'placeholder',
    tolerance: 'pointer',
    toleranceElement: '> div',
    handle: '.-move',
    start: function start(event, ui) {
      $(ui.helper).addClass('dragging');
    },
    stop: function stop(event, ui) {
      var li = ui.item;
      li.removeClass('dragging');
      var id = li.attr('rel');
      var parentId = li.parents('li').attr('rel');
      var prevId = li.prev('li').first().attr('rel');

      if (parentId == null) {
        parentId = undefined;
      }

      if (prevId == null) {
        prevId = undefined;
      }

      data = {
        _method: 'PUT',
        prevId: prevId,
        parentId: parentId
      };
      $.ajax({
        async: false,
        type: 'POST',
        url: li.attr('href'),
        dataType: 'script',
        data: data
      });
    }
  });
};

$.fn.withNestedSortable.defaults = {
  maxLevels: 0
}; // AJAX request with authenticity_token (in caching case).

$.fn.ajaxRequestLink = function (options) {
  var defaults = {
    type: 'POST',
    method: 'post',
    confirmation: 'Вы уверены?'
  };
  var settings = $.extend({}, defaults, options);
  $(this).on('click', function (event) {
    event.preventDefault();
    var link = $(this);
    var token = $('meta[name=csrf-token]').attr('content');

    if (typeof token === 'string') {
      $.ajax({
        type: settings.type,
        url: link.attr('rel'),
        data: {
          authenticity_token: token,
          _method: settings.method
        },
        beforeSend: function beforeSend(xhr) {
          if (link.is('.with-confirmation')) {
            if (window.confirm(settings.confirmation) !== true) {
              return false;
            }
          }
        },
        success: function success(data) {
          if (link.is('.disable-after-success')) {
            link.replaceWith($("<span>".concat(link.text(), "</span>")));
          }
        }
      });
    } else {
      return false;
    }

    return false;
  });
};

$.fn.addLinkToSubmitForm = function () {
  if ($(this).length > 0) {
    $(this).each(function () {
      var form = $(this);

      if (form.find('a.submit-form').length === 0) {
        var link = $("<a class=\"submit-form\" href=\"".concat(form.attr('action'), "\">").concat(form.attr('title'), "</a>"));
        form.append(link);
        form.attr('title', '');
      }
    });
  }
};