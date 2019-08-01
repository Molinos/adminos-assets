$('#select-all').click(function() {
  if (this.checked) {
    $('input[name=id_eq[]]').each(function() {
      this.checked = true;
    });
  } else {
    $('input[name=id_eq[]]').each(function() {
      this.checked = false;
    });
  }
});
