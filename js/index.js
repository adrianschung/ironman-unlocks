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
  'd-bottom',
  'a-bottom',
  'k-bottom',
  'g-bottom',
  't-bottom',
  'v-bottom',
  'd-axe',
  'a-staff',
  'k-bow',
  'g-spear',
  't-hammers',
  'v-flail',
  'a-helm',
  'a-cp',
  'a-cs',
  'a-hilt',
  'b-cp',
  'b-tass',
  'b-boots',
  'b-hilt',
  's-sword',
  's-light',
  'a-cb',
  's-hilt',
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
