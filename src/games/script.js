const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First card flipped
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        // Match found
        disableCards();
    } else {
        // Not a match
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
    }, 1500);
}

cards.forEach(card => card.addEventListener('click', flipCard));
