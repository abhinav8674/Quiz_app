const questions = [
    {
        question: "Where is the capital of India?",
        answers: [
            {text: "Mumbai", correct: false},
            {text: "Ranchi", correct: false},
            {text: "New Delhi", correct: true},
            {text: "Kolkata", correct: false},
        ]
    },
    {
        question: "Where is the capital of Jharkhand?",
        answers: [
            {text: "Lucknow", correct: false},
            {text: "New Delhi", correct: false},
            {text: "Kolkata", correct: false},
            {text: "Ranchi", correct: true},
        ]
    },
    {
        question: "Where is the capital of Maharashtra?",
        answers: [
            {text: "Mumbai", correct: true},
            {text: "Chennai", correct: false},
            {text: "New Delhi", correct: false},
            {text: "Ranchi", correct: false},
        ]
    },
    {
        question: "Where is the capital of West Bengal?",
        answers: [
            {text: "Mumbai", correct: false},
            {text: "Kolkata", correct: true},
            {text: "Bhopal", correct: false},
            {text: "New Delhi", correct: false},
        ]
    },
    {
        question: "Where is the capital of Punjab?",
        answers: [
            {text: "Haryana", correct: false},
            {text: "Kolkata", correct: false},
            {text: "Chandigarh", correct: true},
            {text: "New Delhi", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz(){
    currentQuestionindex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);


    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionindex++;
    if(currentQuestionindex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionindex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();

