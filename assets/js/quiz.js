import {questions} from '../../data/quizData.js';

const startScreen = document.querySelector('.start-screen');
const quizScreen = document.querySelector('.quiz-screen');
const endScreen = document.querySelector('.end-screen');
const screens = [startScreen, quizScreen, endScreen];

const dialog = document.querySelector('.quiz-dialog');
const answersWrapper = document.querySelector('.answers-wrapper');


let totalQuestions = questions.length;
let answers = [];
let isLocked = false;

renderTotalQuestions()

document.addEventListener('click', e => {
    const startQuizBtn = e.target.closest('.start-quiz-btn');

    if (startQuizBtn) {
        startQuiz();
    }

    const answer = e.target.closest('.quiz-answer');
    if (answer) {
        validateAnswer(answer)
    }

    const quizBtn = e.target.closest('.quiz-trigger-btn');

    if (quizBtn) {
        openQuizModal();
    }

    const exitQuizBtn = e.target.closest('.exit-quiz-btn');

    if (exitQuizBtn) {
        document.body.classList.remove('no-scroll');
    }
})

dialog.addEventListener('click', e => {
    if (e.target === dialog) {
        closeModal();
    }
})

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
})

function closeModal() {
    dialog.close();
    document.body.classList.remove('no-scroll')
}

function showScreen(screenToShow) {
    screens.forEach(s => s.classList.add('hidden'));

    screenToShow.classList.remove('hidden');
}

function openQuizModal() {
    answers = [];
    showScreen(startScreen);
    dialog.showModal();
    isLocked = false;
    document.body.classList.add('no-scroll')
}

function startQuiz() {
    const currentQuestionIndex = answers.length;
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestionIndex >= totalQuestions) {
        renderEndScreen(answers);
        showScreen(endScreen);
        return;
    }

    renderQuestion(currentQuestion);
    showScreen(quizScreen);
}

function renderTotalQuestions() {
    const totalQuestionsEl = document.querySelectorAll('.total-questions');

    totalQuestionsEl.forEach(q => {
        q.textContent = totalQuestions;
    })
}

function renderQuestion(questionObj) {
    const questionHeadingEl = document.getElementById('question');
    const quistionNumberEl = document.getElementById('quiz-index');
    const remainingQuestionsEl = document.getElementById('remaining-questions');


    console.log(answers, answers.length);
    let answersHTML = '';

    for (const answer of questionObj.answers) {
        answersHTML += `<label class="quiz-answer" data-answer-id="${answer.id}">
                                <input type="radio" name="quiz-answer" value="${answer.id}">

                                ${answer.answer}
                        </label>`
    }

    answersWrapper.innerHTML = answersHTML;
    questionHeadingEl.textContent = questionObj.question;
    quistionNumberEl.textContent = answers.length + 1;
    remainingQuestionsEl.textContent = totalQuestions - answers.length - 1;
}


function renderEndScreen(answersArr) {
    const correctAnswersEl = document.getElementById('correct-answers');

    const correctAnswers = answersArr.filter(a => a.isCorrect);

    correctAnswersEl.textContent = correctAnswers.length;
}



function validateAnswer(answerEl) {
    if (answerEl.classList.contains('answered')) return;

    if (isLocked) return;
    isLocked = true;

    const answerId = answerEl.dataset.answerId;
    answerEl.classList.add('answered')

    const currentQuestionIndex = answers.length;
    const currentQuestion = questions[currentQuestionIndex];

    let givenAnswer = '';

    for (const answer of currentQuestion.answers) {
        if (answer.id === answerId) {
            givenAnswer = answer;
        }
    }

    if (!givenAnswer) {
        console.error('ERROR: answer not found');
        return
    }

    answers.push(givenAnswer);

    givenAnswer.isCorrect ? answerEl.classList.add('correct') : answerEl.classList.add('incorrect')

    answersWrapper.classList.add('locked')

    setTimeout(() => {

        answerEl.classList.remove('correct', 'incorrect');
        isLocked = false;
        answersWrapper.classList.remove('locked')
        startQuiz();
    }, 1000)
}