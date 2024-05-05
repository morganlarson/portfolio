var cards = document.querySelectorAll('.card');
var imageCounter = 0;
var nyanCatCard = Math.floor(Math.random() * 5);
const jsConfetti = new JSConfetti();
const newGameButton = document.querySelector(".newGame");

populateCards();

function populateCards() {
  cards.forEach((card) => {
    var cardBack = card.childNodes[3];
    if (imageCounter == nyanCatCard) {
      cardBack.innerHTML = `<img class="nyanCat" src="../images/nyan-cat.png" style="padding-top:30px;" width="100px" height="auto" alt="Mole">`;
    } else {
      cardBack.innerHTML = `<img class="wrong" src="../images/Red_X.svg.png" style="padding-top:50px;" width="75px" height="auto" alt="Wrong!">`;
    }
    imageCounter++;
    
    card.addEventListener( 'click', function() {
      card.classList.toggle('is-flipped');
      card.style.pointerEvents = "none";
      if (cardBack.childNodes[0].classList.contains("nyanCat")) {
        success();
      }
    });
  });
}

function success() {
  jsConfetti.addConfetti();
  cards.forEach((card) => {
    card.style.pointerEvents = "none";
  });
  newGameButton.removeAttribute("hidden")
}

newGameButton.onclick = (e) => {
  location.reload();
  newGameButton.setAttribute("hidden", "")
}
