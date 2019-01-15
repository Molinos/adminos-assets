$.fn.withNestedSortable = function (options) {
  const defaults = $.extend({}, $.fn.withNestedSortable.defaults, {
    maxLevels: $(this).attr('max-levels'),
  });
  const settings = $.extend({}, defaults, options);

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
    start(event, ui) {
      $(ui.helper).addClass('dragging');
    },
    stop(event, ui) {
      const li = ui.item;
      li.removeClass('dragging');
      const id = li.attr('rel');
      let parentId = li.parents('li').attr('rel');
      let prevId = li.prev('li').first().attr('rel');
      if (parentId == null) {
        parentId = undefined;
      }
      if (prevId == null) {
        prevId = undefined;
      }

      const data = {
        _method: 'PUT',
        prevId,
        parentId,
      };

      $.ajax({
        async: false,
        type: 'POST',
        url: li.attr('href'),
        dataType: 'script',
        data,
      });
    },
  });
};
$.fn.withNestedSortable.defaults = {
  maxLevels: 0,
};

// AJAX request with authenticity_token (in caching case).
$.fn.ajaxRequestLink = function (options) {
  const defaults = {
    type: 'POST',
    method: 'post',
    confirmation: 'Вы уверены?',
  };
  const settings = $.extend({}, defaults, options);
  $(this).on('click', function (event) {
    event.preventDefault();
    const link = $(this);
    const token = $('meta[name=csrf-token]').attr('content');
    if (typeof token === 'string') {
      $.ajax({
        type: settings.type,
        url: link.attr('rel'),
        data: {
          authenticity_token: token,
          _method: settings.method,
        },
        beforeSend(xhr) {
          if (link.is('.with-confirmation')) {
            if (window.confirm(settings.confirmation) !== true) {
              return false;
            }
          }
        },
        success(data) {
          if (link.is('.disable-after-success')) {
            link.replaceWith($(`<span>${link.text()}</span>`));
          }
        },
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
      const form = $(this);
      if (form.find('a.submit-form').length === 0) {
        const link = $(
          `<a class="submit-form" href="${form.attr('action')}">${
            form.attr('title')
          }</a>`,
        );
        form.append(link);
        form.attr('title', '');
      }
    });
  }
};
