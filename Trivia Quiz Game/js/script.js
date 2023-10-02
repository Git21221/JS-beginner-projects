const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.querySelector('.question');
const answersElement = document.querySelector('.answers');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');
const nextButton = document.querySelector('.next-button');

const questions = [
	{
		question: 'What is the capital of France?',
		answers: ['Paris', 'Berlin', 'London', 'Madrid'],
		correctAnswer: 'Paris',
	},
	{
		question: 'Which planet is known as the Red Planet?',
		answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
		correctAnswer: 'Mars',
	},
	{
		question: 'Who wrote the play "Romeo and Juliet"?',
		answers: [
			'Charles Dickens',
			'Jane Austen',
			'William Shakespeare',
			'Leo Tolstoy',
		],
		correctAnswer: 'William Shakespeare',
	},
	{
		question: 'Which is the heavier metal of these two?',
		answers: ['Gold', 'Silver'],
		correctAnswer: 'Gold',
	},
	{
		question: 'Who invented Computer?',
		answers: ['Elon Musk', 'Charles Babbage', 'Evan You', 'Taylor Otwell'],
		correctAnswer: 'Charles Babbage',
	},
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

function loadQuestion() {
	const currentQuestion = questions[currentQuestionIndex];
	questionElement.textContent = currentQuestion.question;
	answersElement.innerHTML = '';

	currentQuestion.answers.forEach((answer) => {
		const answerButton = document.createElement('button');
		answerButton.textContent = answer;
		answerButton.addEventListener('click', () =>
			checkAnswer(answer, currentQuestion.correctAnswer)
		);
		answersElement.appendChild(answerButton);
	});
}

function checkAnswer(selectedAnswer, correctAnswer) {
	if (selectedAnswer === correctAnswer) {
		score++;
		scoreElement.textContent = score;
	}

	currentQuestionIndex++;

	if (currentQuestionIndex < questions.length) {
		loadQuestion();
	} else {
		endQuiz();
	}
}

function endQuiz() {
	quizContainer.innerHTML = `<h1>Quiz Over!</h1><p>Your Score: ${score}</p>`;
	nextButton.style.display = 'none';
}

function countdown() {
	const countdownInterval = setInterval(() => {
		timeLeft--;
		timeElement.textContent = timeLeft;

		if (timeLeft === 0) {
			clearInterval(countdownInterval);
			endQuiz();
		}
	}, 1000);
}

nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		loadQuestion();
	} else {
		endQuiz();
	}
});

loadQuestion();
countdown();
