$(() => {
  $('form a.submit-form, form input.delete-button, form.remote button')
    .on('click', function (event) {
      event.preventDefault();
        const form = $(this).parents('form');
      const confirmMessage = form.find('.confirm-message');
      if (confirmMessage.length > 0) {
        if (!confirm(confirmMessage.val())) {
          return false;
        }
      }
      form.submit();

      return false;
    });
});
