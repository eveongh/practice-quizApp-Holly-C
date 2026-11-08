let quizData = [
    {
        question: "Question 1: Select the correct answer",
        choices: ["incorrect", "correct", "incorrect", "incorrect"],
        correctAnswer: 1,
        explanation: "...",
        userAnswer: null
    },
    {
        question: "Question 2: Select the correct answer",
        choices: ["correct", "incorrect", "incorrect", "incorrect"],
        correctAnswer: 0,
        explanation: "...",
        userAnswer: null
    },
    {
        question: "Question 3: Select the correct answer",
        choices: ["correct", "incorrect", "incorrect", "incorrect"],
        correctAnswer: 0,
        explanation: "...",
        userAnswer: null
    },
    {
        question: "Question 4: Select the correct answer",
        choices: ["incorrect", "correct", "incorrect", "incorrect"],
        correctAnswer: 1,
        explanation: "...",
        userAnswer: null
    }
];

let currentQuizData = 0; 
let score = 0; 

// grabs all the buttons
let buttons = document.getElementsByClassName("choice-button");

// shows the questions on the screen
function showQuestion() {
    // clears the highlighted option
    buttons[0].classList.remove("correct", "incorrect");
    buttons[1].classList.remove("correct", "incorrect");
    buttons[2].classList.remove("correct", "incorrect");
    buttons[3].classList.remove("correct", "incorrect");

    // clears any feedback text
    document.getElementById("feedback").innerText = "";
    
    // pulls the current question from quiz data
    let currentQuestion = quizData[currentQuizData];
    
    // updates text for question
    document.getElementById("question").innerText = currentQuestion.question;
    
    // updates text for possible choices 
    buttons[0].innerText = currentQuestion.choices[0];
    buttons[1].innerText = currentQuestion.choices[1];
    buttons[2].innerText = currentQuestion.choices[2];
    buttons[3].innerText = currentQuestion.choices[3];
    
    // hides the explanation after
    document.getElementById("explanation-text").classList.add("hide");

    // checks if question already answered
    if (currentQuestion.userAnswer !== null) {
        buttons[0].disabled = true;
        buttons[1].disabled = true;
        buttons[2].disabled = true;
        buttons[3].disabled = true;

        if (currentQuestion.userAnswer === currentQuestion.correctAnswer) {
            buttons[currentQuestion.userAnswer].classList.add("correct");
            document.getElementById("feedback").innerText = "Correct! 🎉";
        } else {
            buttons[currentQuestion.userAnswer].classList.add("incorrect");
            document.getElementById("feedback").innerText = "Wrong! ❌";
            document.getElementById("explanation-text").innerText = currentQuestion.explanation;
            document.getElementById("explanation-text").classList.remove("hide");
        }
    } else {
        buttons[0].disabled = false;
        buttons[1].disabled = false;
        buttons[2].disabled = false;
        buttons[3].disabled = false;
    }
}

// scores questions right or wrong
function checkAnswer(buttonIndex) {
    let currentQuestion = quizData[currentQuizData];

    // quiz remembers which answer was picked
    currentQuestion.userAnswer = buttonIndex;

    //disables button selection
    buttons[0].disabled = true;
    buttons[1].disabled = true;
    buttons[2].disabled = true;
    buttons[3].disabled = true;

    if (buttonIndex === currentQuestion.correctAnswer) {
        document.getElementById("feedback").innerText = "Correct! 🎉";
        buttons[buttonIndex].classList.add("correct");
        score = score + 1;
    } else {
        document.getElementById("feedback").innerText = "Wrong! ❌";
        document.getElementById("explanation-text").innerText = currentQuestion.explanation;
        document.getElementById("explanation-text").classList.remove("hide");
        buttons[buttonIndex].classList.add("incorrect");
    }
} 

// tells buttons what to do when clicked
buttons[0].onclick = function(){ checkAnswer(0); };
buttons[1].onclick = function(){ checkAnswer(1); };
buttons[2].onclick = function(){ checkAnswer(2); };
buttons[3].onclick = function(){ checkAnswer(3); };

// next button 
document.getElementById("next-question").onclick = function(){
    currentQuizData = currentQuizData + 1; 

    if (currentQuizData < quizData.length) {
        showQuestion();
    } else {
        document.getElementById("quiz-screen").style.display = "none";
        document.getElementById("results").style.display = "block";
        
        document.getElementById("final-score").innerText = score;
        document.getElementById("total-questions").innerText = quizData.length;
    }
};

// previous button
document.getElementById("prev-question").onclick = function(){
    if (currentQuizData > 0) {
        currentQuizData = currentQuizData - 1; 
        showQuestion();
    }
};

// try again button
document.getElementById("restart-quiz").onclick = function() {
    currentQuizData = 0;
    score = 0;
    
    quizData[0].userAnswer = null;
    quizData[1].userAnswer = null;
    quizData[2].userAnswer = null;
    quizData[3].userAnswer = null;

    document.getElementById("results").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    showQuestion();
};

// starts the quiz 
showQuestion();
