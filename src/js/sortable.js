$(function sort() {
  $('.with-nested-sortable > ul').withNestedSortable();
  $('a.ajax-post').ajaxRequestLink();
  $('a.ajax-delete').ajaxRequestLink({
    method: 'delete',
  });
  $('form.method-link-to').addLinkToSubmitForm();

  // Togglable tabs <http://twitter.github.com/bootstrap/javascript.html#tabs>.
  $('.with-togglable-navigation .active a').tab('show');
  $('.with-togglable-navigation a').click(function (event) {
    event.preventDefault();
    $(this).tab('show');
  });
  $('.with-togglable-navigation *[data-toggle]').on('shown', (event) => {
    $(event.target).addClass('active'); // activated tab
    // event.relatedTarget; // previous tab
  });

  $('.with-move-to').sortable({
    handle: '.icon-move',
    stop(event, ui) {
      const to = ui.item.prev().data('id');
      const url = ui.item.data('href');
      $.post(url, {
        to,
      });
    },
  });

  $('.with-apply-sortable-order[data-sortable]').sortable({
    opacity: 0.6,
    helper(event, el) {
      let content = '';
      const img = $(el).find('.sortable-helper');
      if (img.length > 0) {
        content = `<img src="${$(img).attr('src')}"/>`;
      } else {
        content = $(el).attr('data-placeholder');
      }

      return `<div class="helper" style="width: auto; height: auto">${content}</div>`;
    },
    appendTo: 'body',
    handler: 'icon-move',
    items: $(this).attr('items'),
    stop() {
      const url = $(this).attr('data-sortable');
      if (url) {
        const ids = $.map(
          $(this).children(),
          e => $(e).attr('data-id'),
        );

        $.ajax({
          type: 'post',
          dataType: 'script',
          data: {
            id: ids,
          },
          url,
        });
      }
    },
  });
});
