const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is closest to the sun?",
        answers: [
            { text: "Mercury", correct: true },
            { text: "Venus", correct: false },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic", correct: false },
            { text: "Pacific", correct: true },
            { text: "Indian", correct: false },
            { text: "Arctic", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    nextButton.style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        score++;
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = 'block';
    } else {
        resultElement.innerText = `You scored ${score} out of ${questions.length}`;
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        startQuiz();
    }
});

startQuiz();
