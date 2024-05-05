const contactNameInput = document.querySelector("#contactNameInput");
const contactMessageInput = document.querySelector("#contactMessageInput");
const contactPreference = document.querySelector("#contactPreference");
const enterContactMethodLabel = document.querySelector("#enterContactMethodLabel");
const enterContactMethodInput = document.querySelector("#enterContactMethodInput");
const contactFormSubmitButton = document.querySelector("#contactFormSubmit");
const contactCardReviewFormat = document.querySelector("#review");
const contactCardContactFormat = document.querySelector("#contact");
const missingInfoLabel = document.querySelector("#missingInfo");

// Contact Preference
// on window load, get all reviews from review.json and populate contact.html

window.addEventListener('load', fetchReviews);

function fetchReviews() {
  var overallStarRating = 0;
  let output = document.getElementById("output");
  fetch('./data/reviews.json')
      .then(response => response.json())
      .then(data => {
          const reviews = data.reviews;
          for (let i = 0; i < reviews.length; i++) {
            displayReview(reviews[i].message, reviews[i].name);
            overallStarRating += reviews[i].stars;
          }
          overallStarRating = overallStarRating / reviews.length;
          updateStars(overallStarRating)
      })
      .catch(error => console.error('Error fetching reviews:', error));
}

function updateStars(overallStarRating) {
  output.innerText = "Rating is: " + overallStarRating + "/5";
}

function updateReviews(review) {
  fetch('/submit-review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to submit review');
    }
    console.log('Review submitted successfully!');
  })
  .catch(error => {
    console.error('Error submitting review:', error);
  });
}

// To access the stars
let stars = document.getElementsByClassName("star");
let starsRating = 0;

// Function to update rating
function rating(n) {
	remove();
	for (let i = 0; i < n; i++) {
		if (n == 1) cls = "one";
		else if (n == 2) cls = "two";
		else if (n == 3) cls = "three";
		else if (n == 4) cls = "four";
		else if (n == 5) cls = "five";
		stars[i].className = "star " + cls;
	}
  starsRating = n;
}

// To remove the pre-applied styling
function remove() {
	let i = 0;
	while (i < 5) {
		stars[i].className = "star";
		i++;
	}
}


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
  const contactCardReviewFormatValue = contactCardReviewFormat.checked;
  const contactCardContactFormatValue = contactCardContactFormat.checked;

  if (contactNameValue == "") {
    missingInfoLabel.textContent = "Please enter a name.";
  } else if (contactCardReviewFormatValue == "" && contactCardContactFormatValue == "") {
    missingInfoLabel.textContent = "Please choose a format: review or contact.";
  } else if (contactMessageValue == "") {
    missingInfoLabel.textContent = "Please enter a message.";
  } else if (contactPreferenceValue == "" || contactPreferenceValue == "--select--") {
    missingInfoLabel.textContent = "Please choose a contact preference.";
  } else if (contactPreferenceValue != "noContact" && contactMethodValue == "") {
    missingInfoLabel.textContent = "Please enter your contact information.";
  } else {
    if (contactCardReviewFormatValue) {
      // save review to review.json and then show it under contact card
      var review = {
        name: contactNameValue,
        message: contactMessageValue,
        preference: contactPreferenceValue,
        method: contactMethodValue,
        stars: starsRating
      };
      updateReviews(review);
      displayReview(contactMessageValue, contactNameValue);
    }
    // else if (contactCardContactFormatValue) {
      // contact only, save review to contact.json

    // }

    missingInfoLabel.textContent = "";
    clearValues();
    Swal.fire({
      icon: "success",
      title: "Thanks!",
      text: "Submission successful"
    });
  }
}

function displayReview(contactMessageValue, contactNameValue) {
  const contentCardParent = document.createElement('div');
  const contentCardChild = document.createElement('div');
        
  contentCardParent.classList.add('contentCardParent');
  contentCardChild.classList.add('contentCardChild');
  contentCardChild.classList.add('textblock');

  contentCardChild.textContent = "\"" + contactMessageValue + "\"\n - " + contactNameValue;

  contentCardParent.appendChild(contentCardChild);

  const existingDiv = document.getElementById('pageParent');
  existingDiv.appendChild(contentCardParent);
}

function clearValues() {
  contactNameInput.value = "";
  contactMessageInput.value = "";
  contactPreference.value = "";
  enterContactMethodInput.value = "";
  contactCardReviewFormat.checked = false;
  contactCardContactFormat.checked = false;
}
