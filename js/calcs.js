const maxLevel = 200;
const gAltar = 3.5;
const ecto = 4;
const cAltar = 7;
var currentXP = parseInt(localStorage.getItem('prayerXP'));
var goalLvl = parseInt(localStorage.getItem('prayer')) + 1;
var points = 0;
var output = 1;

function getXP(lvl) {
  for (i = 1; i <= lvl - 1; i++) {
    points += Math.floor(i + 300 * Math.pow(2, i / 7));
    output = Math.floor(points / 4);
  }
  return output;
}

function getRemainingXP(xp, lvl) {
  var goalXP = getXP(lvl);
  var remainingXP = goalXP - xp;
  return remainingXP;
}

$(function() {
  var goalXP = getRemainingXP(currentXP, goalLvl);
  $('#current-xp').val(currentXP);
  $('#goal-lvl').val(goalLvl);
  $('#xp').text(`You need ${goalXP} xp to reach your goal`);
});