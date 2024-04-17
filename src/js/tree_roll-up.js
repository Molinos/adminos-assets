$(() => {
  $(document).on('click', 'div.list-item', function (e) {
    const el = $(this).find('.list-item__more-arrow');

    if (el.length !== 0) {
      e.stopPropagation();
      $(this).siblings('ul.list__list').slideToggle();
      el.toggleClass('arrow-rotate');
    }
  });

  $(document).on('click', '.list-item *', (e) => {
    const el = $(this).find('.list-item__more-arrow');

    if (el.length !== 0) {
      e.stopPropagation();
    }
  });

  function addArrow(element) {
    if ($(element).siblings('ul').length) {
      $(element).siblings('ul').addClass('list__list');
      if (!$(element).children('.list-item__more-arrow').length) {
        $(element).append('<svg class="list-item__more-arrow arrow-rotate" xmlns="http://www.w3.org/2000/svg" width="10" height="6">'
            + '<path fill="#191919" d="M1.2 0L0 1.1 5 6l5-4.9L8.8 0 5 3.7 1.2 0z"/></svg>');
      }
    } else if ($(element).children('.list-item__more-arrow').length) {
      const arrow = $(element).children('.list-item__more-arrow');
      $(arrow).remove();
    }
  }

  $('div.list-item').each(function () {
    addArrow($(this));
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      $('div.list-item').each(function () {
        addArrow($(this));
      });
    });
  });

  const config = { childList: true, subtree: true };

  function addObserverIfDesiredNodeAvailable() {
    const tree = $('ul.ui-sortable')[0];
    if (!tree) {
      // The node we need does not exist yet.
      // Wait 500ms and try again
      window.setTimeout(addObserverIfDesiredNodeAvailable, 500);

      return;
    }

    observer.observe(tree, config);
  }
  addObserverIfDesiredNodeAvailable();
});
