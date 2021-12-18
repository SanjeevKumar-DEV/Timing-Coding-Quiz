var displayOptions = [
    { display: document.querySelector('#option1') },
    { display: document.querySelector('#option2') },
    { display: document.querySelector('#option3') },
    { display: document.querySelector('#option4') }]
var startQuizButton = document.querySelector('#startButton');
//var yourAnswer = document.querySelector('#yourEvaluatedAnswer');
var yourAnswer = document.querySelector('.options');
var yourEvaluatedAnswer = document.querySelector('#yourEvaluatedAnswer');
var remainingTime = document.querySelector('#remainingTime');
var startTheQuizH1Tag = document.querySelector('#startTheQuizH1');
var questionH2Tag = document.querySelector('header .question');
var quizInstructions = document.querySelector('#instructions');
var yourScoreKeeper = document.querySelector('#yourScoreKeeper');
var separator = document.querySelector('#separator');
var submitPlayerDetailsForm = document.querySelector('#submitPlayerDetailsForm');
var capturePlayerName = document.querySelector('#yourName');
var stats = [];



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
    },
    {
        questionText: "Arrays in javascript can used to store ____",
        choice: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        answer: "All of the above"
    },
    {
        questionText: "String values must be enclosed within ____  when being assigned to variables.",
        choice: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        answer: "Quotes"
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice: ["Javascript", "Terminal / bash", "For Loops", "Console log"],
        answer: "Console log"
    }
]

var quizManager = {
    playerName: "",
    quizStarted: false,
    quizStates: ['Not Started', 'Started', 'Stopped', 'Scoring', 'Stats'],
    quizCurrentState: 'Not Started',
    currentQuizNumber: 0,
    currentQuizAnswer: "",
    currentEvaluatedAnswer: false,
    totalNumberOfCorrectAnswers: 0,
    totalScore: 0,
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
        if (quiz[this.currentQuizNumber].answer === this.currentQuizAnswer) {
            this.totalNumberOfCorrectAnswers++;
            this.currentEvaluatedAnswer = true;
            evaluateAndDisplayTheAnswer('Correct!!');
        }
        else {
            this.currentEvaluatedAnswer = false;
            if (secondsLeft - 10 < 0) {
                secondsLeft = 0;
            }
            else {
                secondsLeft = secondsLeft - 10;
            }
            evaluateAndDisplayTheAnswer('Wrong!!');
        }
        this.currentQuizNumber++;
        console.log("From Executed : " + quizManager);
        return this.currentEvaluatedAnswer;
    },
    reloadTheVariablesForNextQuiz: function () {
        this.currentQuizAnswer = "";
        this.currentEvaluatedAnswer = false;
        // yourEvaluatedAnswer.textContent = "Play the next, your time is ticking.";
    },
    stopTheQuiz: function () {
        this.quizCurrentState = this.quizStates[2];
        //prepareAndDisplayScore();
    },
    exitTheQuiz: function () {
        this.playerName = "";
        this.quizStarted = false;
        this.quizCurrentState = quizStates[2];
        this.currentQuizNumber = 0;
        this.currentQuizAnswer = "";
        this.currentEvaluatedAnswer = false;
        this.totalNumberOfCorrectAnswers = 0;
        this.totalScore = 0;
    }
};

var statsManager = {
    addLastPlayerStats: function() {
        var playerStats = {
            lastPlayerName: quizManager.playerName,
            lastPlayerTotalScore: quizManager.totalScore,
            lastPlayerTotalNumberOfCorrectAnswers: quizManager.totalNumberOfCorrectAnswers,
            lastPlayertotalNumberOfWrongAnswers: quiz.length - quizManager.totalNumberOfCorrectAnswers
        };
        stats.push(playerStats);
        // console.log(stats);
    } 
};

function displayCurrentQuizOptions(currentQuizNumber) {
    var i;
    questionH2Tag.textContent = quiz[currentQuizNumber].questionText;
    for (i = 0; i < displayOptions.length; i++) {
        displayOptions[i].display.textContent = quiz[currentQuizNumber].choice[i];
        // console.log(displayOption1.textContent);
    }

};

function evaluateAndDisplayTheAnswer(evaluatedAnswer) {
    yourEvaluatedAnswer.textContent = evaluatedAnswer;
};

function prepareDisplayForQuiz() {
    quizInstructions.setAttribute('style', 'display : none');
    startTheQuizH1Tag.setAttribute('style', 'display : none');
    questionH2Tag.setAttribute('style', 'display : block');
    startQuizButton.setAttribute('style', 'display : none');
    yourEvaluatedAnswer.setAttribute('style', 'display : block');
    yourAnswer.setAttribute('style', 'display : block');
    yourEvaluatedAnswer.textContent = "Correctness of your answer shown here!!.";
    separator.setAttribute('style', 'display : block');
    // var startQuizButtonSection = document.querySelector('section .content');
    // startQuizButtonSection.setAttribute('style', 'display : block');
}

function prepareAndDisplayScore() {
    // create elemement for score display
    quizManager.quizCurrentState = quizManager.quizStates[3];
    var scoreHeaderMessageH2Tag = document.querySelector('header .question.scoreMessage');
    scoreHeaderMessageH2Tag.textContent = "All Done!!"
    var scoreDisplayLabel = document.createElement('label');
    scoreDisplayLabel.setAttribute('class', 'scoreDisplay');
    document.getElementById('yourScoreKeeper').appendChild(scoreDisplayLabel);
    scoreDisplayLabel.textContent = 'Your Score : ' + quizManager.totalScore;
    document.getElementById('yourScoreKeeper').setAttribute('style', 'display : block');
    document.getElementById('yourCredentials').setAttribute('style', 'display : block');
    document.getElementsByClassName('options')[0].setAttribute('style', 'display : none');
    // document.getElementsByClassName('options')[0].setAttribute('style', 'display : none');
    // yourEvaluatedAnswer.setAttribute('style', 'display : none');
    // scoreDisplayLabel.setAttribute('style', 'display : block');
}

var secondsLeft = 60;
secondsLeft = quiz.length * 10;

function setTime() {
    var timerInterval = setInterval(function () {
        if (secondsLeft >= 0) {
            remainingTime.textContent = secondsLeft;
        }
        if (quizManager.quizCurrentState === quizManager.quizStates[2]) {
            quizManager.totalScore = secondsLeft;
            prepareAndDisplayScore();
            clearInterval(timerInterval);
        }
        else if (secondsLeft === 0) {
            // Stops execution of action at set interval
            quizManager.stopTheQuiz();
            prepareAndDisplayScore();
            clearInterval(timerInterval);
        }
        secondsLeft--;
    }, 1000);
}




// Add event listener to start plying the quiz
startQuizButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (quiz.length !== 0) {
        quizManager.quizCurrentState = quizManager.quizStates[1];
        prepareDisplayForQuiz();
        setTime();
        quizManager.playTheQuiz();
    }

});

yourAnswer.addEventListener('click', function (event) {
    event.preventDefault();
    if (quizManager.currentQuizNumber <= quiz.length && quizManager.quizCurrentState === quizManager.quizStates[1]) {
        quizManager.recordUserAnswerAndEvaluate(event);
        if (quizManager.currentQuizNumber < quiz.length) {
            quizManager.playTheQuiz();
            quizManager.reloadTheVariablesForNextQuiz();

        }
        else {
            quizManager.stopTheQuiz();
        }
    }
});

submitPlayerDetailsForm.addEventListener('click', function (event) {
    event.preventDefault();
    quizManager.quizCurrentState = quizManager.quizStates[4];
    quizManager.playerName = capturePlayerName.value;
    // console.log(capturePlayerName.textContent + ' : ' + capturePlayerName.innerHTML + ' : ' + capturePlayerName.value) ;
    statsManager.addLastPlayerStats();
});


//console.log(quiz);