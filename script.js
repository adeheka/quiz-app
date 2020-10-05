const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn')
const quizArea = document.querySelector('.quiz-area')

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentIndex++;
    showQuestion();
})

const questionTitle = document.querySelector('.quiz-title');
const answerButtons = document.querySelector('.quiz__section')

let randomizeQuestions, currentIndex;

function startGame() {
    startButton.classList.add('hide')
    randomizeQuestions = questionsArray.sort(() => Math.random() - .5) //return a number in the range of 1 ad 0;
    currentIndex = 0; //first question from the array
    quizArea.classList.remove('hide')
    showQuestion()
}

function showQuestion() {
    resetState() //return quiz back to default state
    setQuestion(randomizeQuestions[currentIndex])
}
function setQuestion(question) {
    questionTitle.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('rkt-btn')
        button.classList.add('primary')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild) //loops and removes all first child of the DOM element
    }
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomizeQuestions.length > currentIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart Quiz'
        startButton.classList.remove('hide')
    }
}
function setStatusClass(element, correct) {
    //gives a wrong or correct styling when a button is clicked 
    clearStatusClass(element)
        if (correct) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
} 
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
/**
 * Questions Arrays of Objects
 */
const questionsArray = [
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '10', correct: false },
            { text: '28', correct: false }
        ]
    },
    {
        question: 'Who is the Tech Twitter Influencer',
        answers: [
            { text: 'Jola', correct: false },
            { text: 'HackSultan', correct: false },
            { text: 'Trojan', correct: false },
            { text: 'Unicodeveloper', correct: true }
        ]
    },
    {
        question: 'How Many River Flowed Out of Eden',
        answers: [
            { text: '3', correct: false },
            { text: '10', correct: false },
            { text: '4', correct: true },
            { text: '5000', correct: false }
        ]
    },
    {
        question: `Who's the best in me and You`,
        answers: [
            { text: 'Me', correct: false},
            { text: 'You', correct: true}
        ]
    }
]