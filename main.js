// Questions and global variables
var questions = [{
    questionText: "Inside which HTML element do we put the JavaScript?",
    answerOptions: ["JavaScript tag", "js tag", "Script tag", "Scripting tag"],
    correctAnswer: "Script tag"
},
{
    questionText: "An external JavaScript file needs to use a script tag",
    answerOptions: ["true", "false"],
    correctAnswer: "false"
},
{
    questionText: " Which built-in method returns the characters in a string beginning at the specified location?",
    answerOptions: ["function myFunction( )", "function:myFunction( )", "function = myFunction( )"],
    correctAnswer: "function myFunction( )"
},
{
    questionText: "How do you add a comment to JavaScript?",
    answerOptions: ["//This is a comment", "'This is a comment", "??This is a comment", "!--this is a comment-->"],
    correctAnswer: "//This is a comment"
}
]
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;


//Begins the game, adds time to the clock
function start() {

timeLeft = 60;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        gameOver(); 
    }
}, 1000);

newQuestion();
}


function gameOver() {
clearInterval(timer);

var quizContent = `
<h2>Game Over</h2>
<h3>You got ` + score +  ` out of 4 questions correct!</h3>
<input type="text" id="name" placeholder="Name"> 
<button onclick="setScore()">Save your score</button>`;

document.getElementById("quizContainer").innerHTML = quizContent;
}

//Hiscore storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("userHighScore",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("userHighScore") + ` your high score is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1>
<br>

<button onclick="clearScore()">Clear score!</button><button onclick="newGame()">Play Again!</button>

`;

document.getElementById("quizContainer").innerHTML = quizContent;
}

//clearing function for the name and score
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("userHighScore",  "");

newGame();
}


function newGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>Code Quiz</h1>
<h3>Are you ready?</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizContainer").innerHTML = quizContent;
}


// Score goes up upon correct answer
function correctAnswer() {
    score += 1;
    newQuestion();
    }


//Time penalty for incorrect question
function wrongAnswer() {
timeLeft -= 10; 
newQuestion();
}



//Goes through the questions and then triggers a game over once through going through them all. 
function newQuestion() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    gameOver();
    return;
}

//Displays Q/A on page, determines whether the answer was the correct answer specified or is the wrong answer and calls the functions of either the correct answer or incorrect answer outcome. 
var quizContent = "<h2>" + questions[currentQuestion].questionText + "</h2>"

for (var buttonGen = 0; buttonGen < questions[currentQuestion].answerOptions.length; buttonGen++) {
    var buttonAnswer = "<button onclick=\"[ANSWER]\">[CHOICE]</button>"; 
    buttonAnswer = buttonAnswer.replace("[CHOICE]", questions[currentQuestion].answerOptions[buttonGen]);

    if (questions[currentQuestion].answerOptions[buttonGen] == questions[currentQuestion].correctAnswer) {
        buttonAnswer = buttonAnswer.replace("[ANSWER]", "correctAnswer()");
    } 
    else {
        buttonAnswer = buttonAnswer.replace("[ANSWER]", "wrongAnswer()");
    }
    quizContent += buttonAnswer
}


document.getElementById("quizContainer").innerHTML = quizContent;
}