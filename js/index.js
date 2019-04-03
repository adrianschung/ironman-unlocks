const items = [
  'd-helm',
  'a-hood',
  'k-coif',
  'g-helm',
  't-helm',
  'v-helm',
  'd-top',
  'a-top',
  'k-top',
  'g-top',
  't-top',
  'v-top',
];

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
