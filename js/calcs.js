const maxLevel = 200;
const gAltar = 3.5;
const ecto = 4;
const cAltar = 7;
const boneXP = [
  4.5,
  4.5,
  5,
  5.3,
  15,
  15,
  25,
  30,
  50,
  72,
  72,
  80,
  110,
  125,
  140,
];
var currentXP = parseInt(localStorage.getItem('prayerXP'));
var goalLvl = parseInt(localStorage.getItem('prayer')) + 1;

function getXP(lvl) {
  var points = 0;
  var output = 1;
  for (i = 1; i <= lvl - 1; i++) {
    points += Math.floor(i + 300 * Math.pow(2, i / 7));
    output = Math.floor(points / 4);
  }
  return output;
}

function getRemainingXP(xp, lvl) {
  const goalXP = getXP(lvl);
  const remainingXP = goalXP - xp;
  return remainingXP;
}

function boneNumber(boneXP, goal) {
  const remainingNumber = Math.ceil(goal / boneXP);
  return remainingNumber;
}

function calcBones(goalXP) {
  $.each(boneXP, function(index, value) {
    $(`#bone-${index + 1}`).text(boneNumber(value, goalXP));
  });
}

function xpText(goalXP) {
  $('#xp').text(`You need ${goalXP} xp to reach your goal`);
}

function updateCalc() {
  const xp = $('#current-xp').val();
  const goal = $('#goal-lvl').val();
  const goalXP = getRemainingXP(xp, goal);
  xpText(goalXP);
  calcBones(goalXP);
}

$(function() {
  const initialGoalXP = getRemainingXP(currentXP, goalLvl);
  $('#current-xp').val(currentXP);
  $('#goal-lvl').val(goalLvl);
  xpText(initialGoalXP);
  calcBones(initialGoalXP);

  $('#current-xp').change(function() {
    updateCalc();
  });

  $('#goal-lvl').change(function() {
    updateCalc();
  });

  $('input:checkbox').click(function() {
    $('input:checkbox')
      .not(this)
      .prop('checked', false);
  });
});
