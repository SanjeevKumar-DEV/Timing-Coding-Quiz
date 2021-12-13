var displayOption1 = document.querySelector("#option1");
var displayOption2 = document.querySelector("#option2");
var displayOption3 = document.querySelector("#option3");
var displayOption4 = document.querySelector("#option4");
var startQuizButton = document.querySelector("#startButton");
var yourAnswer = document.querySelector("#yourEvaluatedAnswer");

var quiz = [
    {
        questionText: "Commonly used datatypes DO NOT include:",
        choice: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    }
]

var quizManager = {
    playerName : "",
    startTheQuiz : true,
    currentQuizNumber : 0,
    currentQuizAnswer : "Alerts",
    currentEvaluatedAnswer : false,
    totalNumberOfPoints : 0,
    playTheQuiz : function() {
        displayCurrentQuizOptions();
        if(evaluateAndDisplayTheAnswer(quiz[0], this.currentQuizAnswer))
        {
            this.totalNumberOfPoints++;
            return this.currentEvaluatedAnswer = true;
        }
        else {
            this.totalNumberOfPoints = this.totalNumberOfPoints + 6;
            return this.currentEvaluatedAnswer = false;
        }
    } 
};

var statsMamager = {
};

function displayCurrentQuizOptions() {
    displayOption1.textContent = quiz[0].choice[0];
    console.log(displayOption1.textContent);
};

function evaluateAndDisplayTheAnswer(currentQuiz, answer) {
    if (currentQuiz.answer === answer) {
        yourAnswer.textContent = "Correct";
        return true;
    }
    else {
        yourAnswer.textContent = "Wrong";
        return false;
    }
};

// Add event listener to start plying the quiz
startQuizButton.addEventListener('click', function(event) {
    event.preventDefault();
    quizManager.playTheQuiz();
});

//console.log(quiz);