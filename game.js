let gamePattern = [];
let userClickedPattern = [];
function buttonAnimation(buttonPressed) {
  var activeButton = document.querySelector("." + buttonPressed);
  activeButton.classList.toggle("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
function flash(selector) {
  $("#" + selector)
    .fadeOut(100)
    .fadeIn(100);
}
function playSound(key) {
  switch (key) {
    case "green":
      var gReen = new Audio("./sounds/green.mp3");
      gReen.play();
      break;
    case "red":
      var rEd = new Audio("./sounds/red.mp3");
      rEd.play();
      break;
    case "yellow":
      var yEllow = new Audio("./sounds/yellow.mp3");
      yEllow.play();
      break;
    case "blue":
      var bLue = new Audio("./sounds/blue.mp3");
      bLue.play();
      break;
  }
}
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;
  var buttonColours = ["green", "red", "yellow", "blue"];
  var randomNumber = Math.floor(4 * Math.random());
  var chosenColour = buttonColours[randomNumber];
  gamePattern.push(chosenColour);
  flash(chosenColour);
  buttonAnimation(chosenColour);
  playSound(chosenColour);
}
function check(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wRong=new Audio("./sounds/wrong.mp3");
    wRong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
var level = 0;
$("body").one("keydown", function () {
  nextSequence();
});
$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  flash(userChosenColour);
  buttonAnimation(userChosenColour);
  playSound(userChosenColour);
  check(userClickedPattern.length-1);
});

function startOver(){
    var level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
