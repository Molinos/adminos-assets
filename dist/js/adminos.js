"use strict";

var ActiveStorage = _interopRequireWildcard(require("activestorage"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

ActiveStorage.start();
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
      var widthInput = img.closest('.cropp').querySelector('input[name="width"]');
      var heightInput = img.closest('.cropp').querySelector('input[name="height"]');
      var cropper = new _cropperjs.default(img, {
        aspectRatio: aspectRatio,
        preview: preview_class,
        maxContainerWidth: '200px',
        ready: function ready(event) {
          var array = crop_coord.value.split(/x|\+/);
          var width = array[0],
              height = array[1],
              x = array[2],
              y = array[3];

          if (width && height && x && y) {
            cropper.setData({
              width: Math.round(width),
              height: Math.round(height),
              x: Math.round(x),
              y: Math.round(y)
            });
          }
        },
        crop: function crop(event) {
          widthInput.value = Math.round(event.detail.width);
          heightInput.value = Math.round(event.detail.height);
        },
        cropend: function cropend(event) {
          var detail = cropper.getData();
          var width = Math.round(detail.width);
          var height = Math.round(detail.height);
          var x = Math.round(detail.x);
          var y = Math.round(detail.y);
          crop_coord.value = width + 'x' + height + '+' + x + '+' + y;
        }
      });
      widthInput.addEventListener('change', function (e) {
        console.log('change', e.currentTarget.value);
        cropper.setData({
          width: Math.round(e.currentTarget.value)
        });
      });
      heightInput.addEventListener('change', function (e) {
        console.log('change', e.currentTarget.value);
        cropper.setData({
          height: Math.round(e.currentTarget.value)
        });
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
  $('.nav__item').each(function () {
    if ($(this).hasClass('active')) {
      var group = $(this).closest('.nav__group');

      if (group.hasClass('opened') === false) {
        group.addClass('opened');
      }

      $('.nav__group').not(group).removeClass('opened');
    }
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

$(function () {
  document.querySelectorAll('.select_filter').forEach(function (el) {
    el.addEventListener('change', function (e) {
      var element = e.currentTarget;
      var selectedValue = element.selectedOptions[0].value;
      var input = element.nextSibling; // q[name_cont] ==> q[name_end]

      input.name = input.name.replace(/(\[).+?(\])/g, "$1" + selectedValue + "$2");
    });
  });
  var filterForm = document.querySelector('.filter-form');

  if (filterForm) {
    filterForm.addEventListener('submit', function (e) {
      var search = document.querySelector('#query');

      if (search) {
        var input = document.createElement("input");
        input.type = 'hidden';
        input.name = search.name;
        input.value = search.value;
        e.currentTarget.appendChild(input);
      }

      return true;
    });
  }
});
"use strict";

var _railsUjs = _interopRequireDefault(require("rails-ujs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_railsUjs.default.start();
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

      if (img.size() > 0) {
        content = '<img src="' + $(img).attr('src') + '"/>';
      } else {
        content = $(el).attr('data-placeholder');
      }

      return '<div class="helper" style="width: auto; height: auto">' + content + '</div>';
    },
    appendTo: 'body',
    handler: 'icon-move',
    items: $(this).attr('items'),
    stop: function stop(event, ui) {
      var url = $(this).attr('data-sortable');

      if (url) {
        var ids = $.map($(this).children(), function (e, idx) {
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

$(document).ready(function () {
  $(document).on('click', 'div.list-item', function (e) {
    e.stopPropagation();
    $(this).siblings('ul.list__list').slideToggle();
    $(this).find('.list-item__more-arrow').toggleClass('arrow-rotate');
  });
  $(document).on('click', '.list-item *', function (e) {
    e.stopPropagation();
  });

  function addArrow(element) {
    if ($(element).siblings('ul').length) {
      $(element).siblings('ul').addClass('list__list');

      if (!$(element).children('.list-item__more-arrow').length) {
        $(element).append('<svg class="list-item__more-arrow arrow-rotate" xmlns="http://www.w3.org/2000/svg" width="10" height="6">' + '<path fill="#191919" d="M1.2 0L0 1.1 5 6l5-4.9L8.8 0 5 3.7 1.2 0z"/></svg>');
      }
    } else {
      if ($(element).children('.list-item__more-arrow').length) {
        var arrow = $(element).children('.list-item__more-arrow');
        $(arrow).remove();
      }
    }
  }

  $('div.list-item').each(function () {
    addArrow($(this));
  });
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
      $('div.list-item').each(function () {
        addArrow($(this));
      });
    });
  });
  var config = {
    childList: true,
    subtree: true
  };

  function addObserverIfDesiredNodeAvailable() {
    var tree = $('ul.ui-sortable')[0];

    if (!tree) {
      //The node we need does not exist yet.
      //Wait 500ms and try again
      window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
      return;
    }

    observer.observe(tree, config);
  }

  addObserverIfDesiredNodeAvailable();
});
"use strict";

$.fn.withNestedSortable = function (options) {
  var defaults = $.extend({}, $.fn.withNestedSortable.defaults, {
    maxLevels: $(this).attr('max-levels')
  });
  var settings = $.extend({}, defaults, options);
  $(this).nestedSortable({
    listType: 'ul',
    opacity: .8,
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
      var parent_id = li.parents('li').attr('rel');
      var prev_id = li.prev('li').first().attr('rel');

      if (parent_id == null) {
        parent_id = undefined;
      }

      if (prev_id == null) {
        prev_id = undefined;
      }

      var data = {
        _method: 'PUT',
        prev_id: prev_id,
        parent_id: parent_id
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
"use strict";

(function ($) {
  var cocoon_element_counter = 0;

  var create_new_id = function create_new_id() {
    return new Date().getTime() + cocoon_element_counter++;
  };

  var newcontent_braced = function newcontent_braced(id) {
    return '[' + id + ']$1';
  };

  var newcontent_underscord = function newcontent_underscord(id) {
    return '_' + id + '_$1';
  };

  var getInsertionNodeElem = function getInsertionNodeElem(insertionNode, insertionTraversal, $this) {
    if (!insertionNode) {
      return $this.parent();
    }

    if (typeof insertionNode == 'function') {
      if (insertionTraversal) {
        console.warn('association-insertion-traversal is ignored, because association-insertion-node is given as a function.');
      }

      return insertionNode($this);
    }

    if (typeof insertionNode == 'string') {
      if (insertionTraversal) {
        return $this[insertionTraversal](insertionNode);
      } else {
        return insertionNode == "this" ? $this : $(insertionNode);
      }
    }
  };

  $(document).on('click', '.add_fields', function (e) {
    e.preventDefault();
    var $this = $(this),
        assoc = $this.data('association'),
        assocs = $this.data('associations'),
        content = $this.data('association-insertion-template'),
        insertionMethod = $this.data('association-insertion-method') || $this.data('association-insertion-position') || 'before',
        insertionNode = $this.data('association-insertion-node'),
        insertionTraversal = $this.data('association-insertion-traversal'),
        count = parseInt($this.data('count'), 10),
        regexp_braced = new RegExp('\\[new_' + assoc + '\\](.*?\\s)', 'g'),
        regexp_underscord = new RegExp('_new_' + assoc + '_(\\w*)', 'g'),
        new_id = create_new_id(),
        new_content = content.replace(regexp_braced, newcontent_braced(new_id)),
        new_contents = [];

    if (new_content == content) {
      regexp_braced = new RegExp('\\[new_' + assocs + '\\](.*?\\s)', 'g');
      regexp_underscord = new RegExp('_new_' + assocs + '_(\\w*)', 'g');
      new_content = content.replace(regexp_braced, newcontent_braced(new_id));
    }

    new_content = new_content.replace(regexp_underscord, newcontent_underscord(new_id));
    new_contents = [new_content];
    count = isNaN(count) ? 1 : Math.max(count, 1);
    count -= 1;

    while (count) {
      new_id = create_new_id();
      new_content = content.replace(regexp_braced, newcontent_braced(new_id));
      new_content = new_content.replace(regexp_underscord, newcontent_underscord(new_id));
      new_contents.push(new_content);
      count -= 1;
    }

    var insertionNodeElem = getInsertionNodeElem(insertionNode, insertionTraversal, $this);

    if (!insertionNodeElem || insertionNodeElem.length == 0) {
      console.warn("Couldn't find the element to insert the template. Make sure your `data-association-insertion-*` on `link_to_add_association` is correct.");
    }

    $.each(new_contents, function (i, node) {
      var contentNode = $(node);
      var before_insert = jQuery.Event('cocoon:before-insert');
      insertionNodeElem.trigger(before_insert, [contentNode]);

      if (!before_insert.isDefaultPrevented()) {
        // allow any of the jquery dom manipulation methods (after, before, append, prepend, etc)
        // to be called on the node.  allows the insertion node to be the parent of the inserted
        // code and doesn't force it to be a sibling like after/before does. default: 'before'
        var addedContent = insertionNodeElem[insertionMethod](contentNode);
        insertionNodeElem.trigger('cocoon:after-insert', [contentNode]);
      }
    });
  });
  $(document).on('click', '.remove_fields.dynamic, .remove_fields.existing', function (e) {
    var $this = $(this),
        wrapper_class = $this.data('wrapper-class') || 'nested-fields',
        node_to_delete = $this.closest('.' + wrapper_class),
        trigger_node = node_to_delete.parent();
    e.preventDefault();
    var before_remove = jQuery.Event('cocoon:before-remove');
    trigger_node.trigger(before_remove, [node_to_delete]);

    if (!before_remove.isDefaultPrevented()) {
      var timeout = trigger_node.data('remove-timeout') || 0;
      setTimeout(function () {
        if ($this.hasClass('dynamic')) {
          node_to_delete.detach();
        } else {
          $this.prev("input[type=hidden]").val("1");
          node_to_delete.hide();
        }

        trigger_node.trigger('cocoon:after-remove', [node_to_delete]);
      }, timeout);
    }
  });
  $(document).on("ready page:load turbolinks:load", function () {
    $('.remove_fields.existing.destroyed').each(function (i, obj) {
      var $this = $(this),
          wrapper_class = $this.data('wrapper-class') || 'nested-fields';
      $this.closest('.' + wrapper_class).hide();
    });
  });
})(jQuery);