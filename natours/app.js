// Import the express
const express = require('express');
const fs = require('fs');

// Setting up to the app variable to call others.
const app = express();

// Setting up the port.
const port = 8080;

/* // Basic Get Request
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello, I am from server.',
    status: 'Success',
    responseCode: 200,
  });
});

// Same for Post Request
app.post('/', (req, res) => {
  res.status(201).json({
    message: 'Now, You can send the post request as well.',
    status: 'Success',
    responseCode: 201,
  });
}); */
// Fetch The Data from file

const fileData = fs.readFileSync('./dev-data/data/tours.json', 'utf-8');
const tours = JSON.parse(fileData);

// Get the Tours List
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
