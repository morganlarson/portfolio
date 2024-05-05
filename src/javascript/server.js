const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(bodyParser.json());

// Endpoint to handle submitting reviews
app.post('/submit-review', (req, res) => {
  const newReview = req.body;

  // Read existing reviews from JSON file
  fs.readFile('reviews.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    let reviews = [];
    try {
      reviews = JSON.parse(data).reviews || [];
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Add new review to the array
    reviews.push(newReview);

    // Write updated reviews back to JSON file
    fs.writeFile('reviews.json', JSON.stringify({ reviews }, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log('Review added successfully!');
      res.status(200).send('Review added successfully!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
