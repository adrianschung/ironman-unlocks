//Initialize all items
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
  't-hammer',
  'v-flail',
  'a-helm',
  'a-cp',
  'a-cs',
  'a-hilt',
  'b-cp',
  'b-tass',
  'b-boots',
  'b-hilt',
  's-sw',
  's-light',
  'a-cb',
  's-hilt',
  'z-spear',
  's-bs',
  's-otd',
  'z-hilt',
  'void-top',
  'void-robe',
  'void-glove',
  'void-melee',
  'void-range',
  'void-mage',
  'elite-top',
  'elite-robe',
  'd-scroll',
  'a-scroll',
  't-buck',
  'dh-cb',
  'd-bul',
  'd-claw',
  'e-maul',
  'k-wand',
  't-bow',
  'an-hat',
  'an-top',
  'an-bottom',
];

//Load state of an item
function loadItems(item, index) {
  $(`#${item}`).addClass(localStorage.getItem(`${item}`));
}

//Load state of every item on page load
$(function() {
  items.forEach(loadItems);
});

//Change state of item on click
$('.icon').click(function() {
  if ($(this).hasClass('unlocked')) {
    $(this).toggleClass('unlocked');
    localStorage.setItem($(this).attr('id'), '');
  } else {
    $(this).toggleClass('unlocked');
    localStorage.setItem($(this).attr('id'), 'unlocked');
  }
});
