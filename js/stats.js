const proxy = 'https://cors.io/?';
const url =
  proxy +
  'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=';
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

//GET request to Oldschool Runescape Hi-Scores API and save each stat to localstorage
function getStats(callback) {
  $.ajaxSetup({ async: false });
  $.get(url + formatName($(':text').val()), function(data) {
    localStorage.setItem('username', $(':text').val());
    var levels = data.split('\n');
    $.each(levels, function(index, value) {
      var info = value.split(',');
      localStorage.setItem(skills[index], info[1]);
      localStorage.setItem(skills[index] + 'XP', info[2]);
    });
    skills.forEach(setStats);
  }).fail(function() {
    alert('Username not found');
  });
}

//Assign each stat to corresponding text
function setStats(stat, index) {
  var storedStat = localStorage.getItem(stat);
  var statSelector = $(`#${stat}`);
  if (storedStat) {
    statSelector.text(localStorage.getItem(stat));
    statSelector.prop('title', 'Exp: ' + localStorage.getItem(stat + 'XP'));
  }
}

//Format names with spaces to be searched properly
function formatName(name) {
  return name.split(' ').join('_');
}

$(function() {
  //Set skills and username to previous search
  skills.forEach(setStats);
  $(':text').val(localStorage.getItem('username'));

  //Search for user
  $(':submit').click(function(event) {
    event.preventDefault();
    getStats();
  });
});
