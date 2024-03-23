// number guessing game js
var numberToGuess = Math.floor(Math.random() * 100) + 1;

var guessCount = 1;

const previousGuesses = document.querySelector(".guesses");
const previousResult = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHi");
const guessSubmitBtn = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

guessSubmitBtn.onclick = (e) => {
  var numberGuessed = parseInt(guessField.value);

  if (isNaN(numberGuessed)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Only enter a number!"
    });
    guessField.value = "";
  } else if (numberGuessed < 1 || numberGuessed > 100) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Only enter values between 1 and 100!"
    });
    guessField.value = "";
  } else {        
    previousGuesses.textContent = previousGuesses.textContent + " " + numberGuessed;
    guessField.value = "";
    guessCount++;

    if (numberGuessed == numberToGuess) {
      previousResult.textContent = "Congratulations!";
      lowOrHigh.textContent = "";
    } else if (guessCount > 10) {
      previousResult.textContent = "Too many guesses - Game Over!";
      lowOrHigh.textContent = "";
      guessSubmitBtn.disabled = true;
    } else {
      previousResult.textContent = "Wrong!";
      if (numberGuessed < numberToGuess) {
        lowOrHigh.textContent = "Too low!"
      } else if (numberGuessed > numberToGuess) {
        lowOrHigh.textContent = "Too High!"
      }
    }
  }
}