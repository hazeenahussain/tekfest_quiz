const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
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

const questions = [
  {
    question: 'JavaScript File Has An Extension of?',
    answers: [
      { text: '.Java', correct: false },
      { text: '.Js', correct: true },
      { text: '.javascript', correct: false },
      { text: '.xml', correct: false }
    ]
  },
  {
    question: 'Method Prompt() Contain ........Number of Parameters.?',
    answers: [
      { text: 'One', correct: false },
      { text: 'Two', correct: true },
      { text: 'Three', correct: false },
      { text: 'Four', correct: false }
    ]
  },
  {
    question: 'IsNaN() Evaluates And Argument To Determine if Given Value:?',
    answers: [
      { text: 'Is Not a Null', correct: false },
      { text: ' Is Not a Number', correct: true },
      { text: ' Is Not a New Object', correct: false },
      { text: 'None Of The Above', correct: false }
    ]
  },
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: 'Js', correct: false },
      { text: 'JavaScript', correct: true },
      { text: ' Script', correct: false },
      { text: 'Scripting', correct: false }
    ]
  }
]