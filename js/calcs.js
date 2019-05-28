const maxLevel = 200,
  gAltar = 3.5,
  ecto = 4,
  cAltar = 7,
  prayerXP = [4.5, 4.5, 5, 5.3, 15, 15, 25, 30, 50, 72, 72, 80, 110, 125, 140],
  conXP = [29, 15, 10, 20, 20, 60, 90, 140, 123.33],
  wcXP= [25, 37.5, 67.5, 85, 100, 125, 40, 175, 127, 250, 380];

var currentXP = parseInt(localStorage.getItem('prayerXP')),
  goalLvl = parseInt(localStorage.getItem('prayer')) + 1;

//Get xp needed for level using Runescape formula
function getXP(lvl) {
  var points = 0;
  var output = 1;
  for (i = 1; i <= lvl - 1; i++) {
    points += Math.floor(i + 300 * Math.pow(2, i / 7));
    output = Math.floor(points / 4);
  }
  return output;
}

//Calculate xp difference between current xp and goal level
function getRemainingXP(xp, lvl) {
  const goalXP = getXP(lvl);
  const remainingXP = goalXP - xp;
  return remainingXP;
}

//Calculate number remaining for specific item
function itemNumber(itemXP, goal) {
  const remainingNumber = Math.ceil(goal / itemXP);
  return remainingNumber;
}

//Calculate and replace text for each item including modifier
function calcItems(goalXP, skill) {
  switch (skill) {
    case 'prayer':
      $.each(prayerXP, function(index, value) {
        if ($('#g-altar').is(':checked')) {
          value *= 3.5;
        } else if ($('#ecto').is(':checked')) {
          value *= 4;
        } else if ($('#c-altar').is(':checked')) {
          value *= 7;
        }
        $(`#prayer-${index}`).text(itemNumber(value, goalXP));
      });
      break;
    case 'construction':
      $.each(conXP, function(index, value) {
        $(`#con-${index}`).text(itemNumber(value, goalXP));
      });
      break;
    case 'woodcutting':
    $.each(wcXP, function(index, value) {
      if ($('#lumber').is(':checked')) {
        value *= 1.025;
      }
      $(`#wc-${index}`).text(itemNumber(value, goalXP));
    });
  }
}

//Get xp or levels from localStorage
function getStorage(item) {
  return parseInt(localStorage.getItem(item));
}

//Update current xp and goal level fields
function updateInputs(skill) {
  level = getStorage(skill) + 1;
  xp = getStorage(skill+'XP');
  goalXP = getRemainingXP(xp, level);
  $('#current-xp').val(xp);
  $('#goal-lvl').val(level);
  xpText(goalXP);
}

//Change text for remaining xp
function xpText(goalXP) {
  $('#xp').text(`You need ${goalXP} xp to reach your goal`);
}

//Update all parts of calculator
function updateCalc(skill) {
  const xp = $('#current-xp').val(),
    goal = $('#goal-lvl').val();
  const goalXP = getRemainingXP(xp, goal);
  xpText(goalXP);
  calcItems(goalXP, skill);
}

//Make changes when inputs are changed
function updateChanges() {
$('#current-xp, #goal-lvl, input:checkbox').change(function() {
    if ($('#prayer-calc').hasClass('active')) {
      skill = 'prayer'
    }
    else if ($('#construction-calc').hasClass('active')) {
      skill = 'construction'
    }
    else if ($('#woodcutting-calc').hasClass('active')) {
      skill = 'woodcutting'
    }
    updateCalc(skill);
  });
}

$(function() {
  //Load xp from stats and calculate for next level
  const initialGoalXP = getRemainingXP(currentXP, goalLvl);
  currentXP ? $('#current-xp').val(currentXP) : $('#current-xp').val(0);
  goalLvl ? $('#goal-lvl').val(goalLvl) : $('#goal-lvl').val(0);
  var skill = '';
  var tabsWrapper = $('.tabs-wrapper');
  if( tabsWrapper.length > 0 ){
    tabsWrapper.find('> ul a').click(function(e){
        e.preventDefault();
        var me = $(this);

        tabsWrapper.find('.active').removeClass('active');
        me.parent().add( me.attr('href') ).addClass('active');
    });
  }
  initialGoalXP ? xpText(initialGoalXP) : xpText(0);
  calcItems(initialGoalXP, 'prayer');
  $('#construction-tab').click(function() {
    updateInputs('construction');
    updateCalc('construction');
  });
  $('#prayer-tab').click(function() {
    updateInputs('prayer');
    updateCalc('prayer');
  });
  $('#woodcutting-tab').click(function() {
    updateInputs('woodcutting');
    updateCalc('woodcutting');
  });
  updateChanges();

  //Prevent multiple modifiers from being checked
  $('input:checkbox').click(function() {
    $('input:checkbox')
      .not(this)
      .prop('checked', false);
  });
});
