const proxy = 'https://cors.io/?';

const skills = [
  'total',
  'attack',
  'defence',
  'strength',
  'hitpoints',
  'ranged',
  'prayer',
  'magic',
  'cooking',
  'woodcutting',
  'fletching',
  'fishing',
  'firemaking',
  'crafting',
  'smithing',
  'mining',
  'herblore',
  'agility',
  'thieving',
  'slayer',
  'farming',
  'runecraft',
  'hunter',
  'construction',
];

var url =
  proxy +
  'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=';

$(function() {
  skills.forEach(setStats);
  $(':text').val(localStorage.getItem('username'));
  $(':submit').click(function(event) {
    event.preventDefault();
    localStorage.setItem('username', $(':text').val());
    setTimeout(getStats(), 3000);
  });
});

function getStats(callback) {
  $.ajaxSetup({ async: false });
  $.get(url + localStorage.getItem('username'), function(data) {
    console.log(data);
    var levels = data.split('\n');
    $.each(levels, function(index, value) {
      var info = value.split(',');
      localStorage.setItem(skills[index], info[1]);
    });
    skills.forEach(setStats);
  });
}

function setStats(stat, index) {
  if (localStorage.getItem(stat)) {
    $(`#${stat}`).text(localStorage.getItem(`${stat}`));
  }
}
