$(function () {
  document.querySelectorAll('.select_filter').forEach(el => {
    el.addEventListener('change', e => {
      let element = e.currentTarget
      let selectedValue = element.selectedOptions[0].value;
      let input = element.nextSibling;

      // q[name_cont] ==> q[name_end]
      input.name = input.name.replace(/(\[).+?(\])/g, "$1" + selectedValue + "$2")
    });
  });

  document.querySelector('.filter-form').addEventListener('submit', e => {
    let search = document.querySelector('#query')

    if (search) {
      let input = document.createElement("input");
      input.type = 'hidden';
      input.name = search.name;
      input.value = search.value;

      e.currentTarget.appendChild(input);
    }

    return true;
  });
});
