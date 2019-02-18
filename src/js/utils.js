$.fn.withNestedSortable = function(options) {
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
    start: function(event, ui) {
      $(ui.helper).addClass('dragging');
    },
    stop: function(event, ui) {
      var li = ui.item;
      li.removeClass('dragging');
      var id = li.attr('rel');
      var parent_id = li.parents('li').attr('rel');
      var prev_id = li.prev('li').first().attr('rel');
      if (parent_id == null) { parent_id = undefined }
      if (prev_id == null) { prev_id = undefined }

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
}
$.fn.withNestedSortable.defaults = {
  maxLevels: 0
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
