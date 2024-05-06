// Light/Dark Mode Toggle
const modeToggles = document.querySelectorAll('.modeToggle');

modeToggles.forEach((item) => {
  item.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
  });
});


// Random Quotes
function fetchRandomQuote() {
  fetch('./data/quotes.json')
      .then(response => response.json())
      .then(data => {
          const quotes = data.quotes;
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const randomQuote = quotes[randomIndex];
          displayQuote(randomQuote);
      })
      .catch(error => console.error('Error fetching quotes:', error));
}

function displayQuote(quote) {
  const quoteCard = document.getElementById('quoteCard');
  quoteCard.innerHTML = `<p>Random Quote:</p><blockquote>${quote}</blockquote>`;
}

window.addEventListener('load', fetchRandomQuote);