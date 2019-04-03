const items = ['d-helm', 'a-hood', 'k-coif', 'g-helm', 't-helm', 'v-helm'];

function loadItems(item, index) {
  $(`#${item}`).addClass(localStorage.getItem(`${item}`));
}

$(function() {
  items.forEach(loadItems);
});

$('.icon').click(function() {
  if ($(this).hasClass('unlocked')) {
    $(this).toggleClass('unlocked');
    localStorage.setItem($(this).attr('id'), '');
  } else {
    $(this).toggleClass('unlocked');
    localStorage.setItem($(this).attr('id'), 'unlocked');
  }
});
