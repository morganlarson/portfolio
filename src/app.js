const contactNameInput = document.querySelector("#contactNameInput");
const contactMessageInput = document.querySelector("#contactMessageInput");
const contactPreference = document.querySelector("#contactPreference");
const enterContactMethodLabel = document.querySelector("#enterContactMethodLabel");
const enterContactMethodInput = document.querySelector("#enterContactMethodInput");
const contactFormSubmitButton = document.querySelector("#contactFormSubmit");
const missingInfoLabel = document.querySelector("#missingInfo");

const modeToggles = document.querySelectorAll('.modeToggle');

modeToggles.forEach((item) => {
  item.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
  });
});

function fetchRandomQuote() {
  fetch('./quotes.json')
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

// Call fetchRandomQuote function when the page loads
window.addEventListener('load', fetchRandomQuote);


contactPreference.onchange = (e) => {
  var chosenContactMethod = e.target.value;
  
  if (chosenContactMethod == "--select--" || chosenContactMethod == "noContact") {
    enterContactMethodLabel.setAttribute("hidden", "");
    enterContactMethodInput.setAttribute("hidden", "");
    enterContactMethodInput.value = "";
  } else {
      if (chosenContactMethod == "email") {
        enterContactMethodLabel.textContent = "Enter your email *";
        enterContactMethodInput.type = "email"
      } else if (chosenContactMethod == "cell") {
        enterContactMethodLabel.textContent = "Enter your cell number *";
        enterContactMethodInput.type = "number"
      } else if (chosenContactMethod == "workPhone") {
        enterContactMethodLabel.textContent = "Enter your work phone number *";
        enterContactMethodInput.type = "number"
      } else if (chosenContactMethod == "homePhone") {
        enterContactMethodLabel.textContent = "Enter your home phone number *";
        enterContactMethodInput.type = "number"
      }
      enterContactMethodLabel.removeAttribute("hidden");
      enterContactMethodInput.removeAttribute("hidden");
  }
}

contactFormSubmitButton.onclick = (e) => {
  const contactNameValue = contactNameInput.value;
  const contactMessageValue = contactMessageInput.value;
  const contactPreferenceValue = contactPreference.value;
  const contactMethodValue = enterContactMethodInput.value;

  if (contactNameValue == "") {
    missingInfoLabel.textContent = "Please enter a name.";
  } else if (contactMessageValue == "") {
    missingInfoLabel.textContent = "Please enter a message.";
  } else if (contactPreferenceValue == "" || contactPreferenceValue == "--select--") {
    missingInfoLabel.textContent = "Please choose a contact preference.";
  } else if (contactPreferenceValue != "noContact" && contactMethodValue == "") {
    missingInfoLabel.textContent = "Please enter your contact information.";
  } else {
    missingInfoLabel.textContent = "";
    clearValues();
    Swal.fire({
      icon: "success",
      title: "Thanks!",
      text: "Submission successful"
    });
  }
}

function clearValues() {
  contactNameInput.value = "";
  contactMessageInput.value = "";
  contactPreference.value = "";
  enterContactMethodInput.value = "";
}
