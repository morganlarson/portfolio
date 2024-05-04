const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const difficultyLevel = document.querySelector("#difficulty")

let result = 0
let hitPosition
let currentTime = 60
let timerId = null

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add('mole')

  hitPosition = randomSquare.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++
      score.textContent = result
      hitPosition = null
    }
  })
})

function moveMole() {
  timerId = setInterval(randomSquare, 500)
}

moveMole()

function setDifficulty() {
  var difficultyTextContent = difficultyLevel.textContent
  clearInterval(timerId)

  if (difficultyTextContent == "simple") {
    //mode is currently hard, change to simple
    timerId = setInterval(randomSquare, 1000)
    difficultyLevel.textContent = "hard"
  } else {
    //mode is currently simple, change to hard
    timerId = setInterval(randomSquare, 500)
    difficultyLevel.textContent = "simple"
  }
}

function countDown() {
 currentTime--
 timeLeft.textContent = currentTime

 if (currentTime == 0) {
   clearInterval(countDownTimerId)
   clearInterval(timerId)
   alert('GAME OVER! Your final score is ' + result)
 }

}

let countDownTimerId = setInterval(countDown, 1000)

