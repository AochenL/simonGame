var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//press any key to start the game
$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level 1");
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level " +level);
    userClickedPattern = [];
    // generate a integer between [0,3]
    var randomNumber = Math.floor(Math.random()*4);
    // generate a color randomly
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // show which color is chosen through animation and sound
    setTimeout(function () {
        animatePress(randomChosenColor);
        playSound(randomChosenColor);
    }, 1000);
}

$(".btn").on("click",function(){
    // record what the user chose
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    // check whether the user got it right
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    // user got one color right
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // user got the whole sequence right, move to the next level
        if (currentLevel+1 === level){
            setTimeout(function () {
              nextSequence();
          }, 1000);
        }
    } else{
        // user got it wrong
        playSound("wrong");
        $("#level-title").text("Game Over. Press Any Key to Restart ");
        restart();
    }
}

function restart(){
    started = false;
    level = 0;
    gamePattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
