var displayOptions = [
    { display: document.querySelector('#option1') },
    { display: document.querySelector('#option2') },
    { display: document.querySelector('#option3') },
    { display: document.querySelector('#option4') }]
var startQuizButton = document.querySelector('#startButton');
//var yourAnswer = document.querySelector('#yourEvaluatedAnswer');
var yourAnswerEvent = document.querySelector('.options');
var yourEvaluatedAnswer = document.querySelector('#yourEvaluatedAnswer');

var quiz = [
    {
        questionText: "Commonly used datatypes DO NOT include:",
        choice: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        questionText: "The Condition in an if/else statement is enclosed within ____",
        choice: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        answer: "Parenthesis"
    }
]

var quizManager = {
    playerName: "",
    startTheQuiz: false,
    currentQuizNumber: 0,
    currentQuizAnswer: "",
    currentEvaluatedAnswer: false,
    totalNumberOfPoints: 0,
    playTheQuiz: function () {
        displayCurrentQuizOptions(this.currentQuizNumber);
    },
    recordUserAnswerAndEvaluate: function (event) {
        // console.log(event);
        // console.log(event.target);
        // console.log(event.srcElement.localName);
        if (event.srcElement.localName === 'li') {
            this.currentQuizAnswer = event.target.textContent;
            // console.log(this.currentQuizAnswer);
            this.evaluateAndDisplay();
        }
        else {
            console.log("From Not Executed : " + quizManager);
        }

    },
    evaluateAndDisplay: function () {
        if (evaluateAndDisplayTheAnswer(quiz[this.currentQuizNumber], this.currentQuizAnswer)) {
            this.totalNumberOfPoints++;
            this.currentEvaluatedAnswer = true;
        }
        else {
            this.currentEvaluatedAnswer = false;
        }
        this.currentQuizNumber++;
        console.log("From Executed : " + quizManager);
        return this.currentEvaluatedAnswer;
    },
    reloadTheVariablesForNextQuiz: function () {
        this.currentQuizAnswer = "";
        this.currentEvaluatedAnswer = false;
        yourEvaluatedAnswer.textContent = "Play the next, your time is ticking.";
    },
    exitTheQuiz: function () {
        this.playerName = "";
        this.startTheQuiz = false;
        this.currentQuizNumber = 0;
        this.currentQuizAnswer = "";
        this.currentEvaluatedAnswer = false;
        this.totalNumberOfPoints = 0;
    }
};

var statsMamager = {
};

function displayCurrentQuizOptions(currentQuizNumber) {
    var i;
    for (i = 0; i < displayOptions.length; i++) {
        displayOptions[i].display.textContent = quiz[currentQuizNumber].choice[i];
        // console.log(displayOption1.textContent);
    }

};

function evaluateAndDisplayTheAnswer(currentQuiz, answer) {
    if (currentQuiz.answer === answer) {
        yourEvaluatedAnswer.textContent = "Correct";
        return true;
    }
    else {
        yourEvaluatedAnswer.textContent = "Wrong";
        return false;
    }
};

// Add event listener to start plying the quiz
startQuizButton.addEventListener('click', function (event) {
    event.preventDefault();
    if(quiz.length !== 0)
    {
        quizManager.startTheQuiz = true;
        quizManager.playTheQuiz();
    }
    
});

yourAnswerEvent.addEventListener('click', function (event) {
    event.preventDefault();
    if (quizManager.currentQuizNumber <= quiz.length && quizManager.startTheQuiz) {
        quizManager.recordUserAnswerAndEvaluate(event);
        if (quizManager.currentQuizNumber < quiz.length) {
            quizManager.playTheQuiz();
            quizManager.reloadTheVariablesForNextQuiz();

        }
    }

});


//console.log(quiz);