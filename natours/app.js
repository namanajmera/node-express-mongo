// Import the express
const express = require('express');

// Setting up to the app variable to call others.
const app = express();

// Setting up the port.
const port = 8080;

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// Basic Get Request
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
});
