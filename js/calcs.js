const maxLevel = 200;
var points = 0;
var output = 1;

function getXP(lvl) {
  for (i = 1; i <= lvl - 1; i++) {
    points += Math.floor(i + 300 * Math.pow(2, i / 7));
    output = Math.floor(points / 4);
  }
  return output;
}

$(function() {
  console.log(getXP(4));
});
