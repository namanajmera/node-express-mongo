// Import the express
const express = require('express');
const fs = require('fs');

// Setting up to the app variable to call others.
const app = express();

//MiddleWares
// For use the body in request.
app.use(express.json());

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

const fileData = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8');
const tours = JSON.parse(fileData);

// Get the Tours List
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

// Post a New Tour
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newObject = Object.assign({ id: newId }, req.body);
  tours.push(newObject);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: newObject });
    }
  );
});

// Get tour by id
app.get('/api/v1/tour/:id', (req, res) => {
  const { id } = req.params;
  const tour = tours.find((ele) => ele.id === Number(id));
  if (tour) {
    res.status(200).json({ status: 'success', data: tour });
  } else {
    res
      .status(404)
      .json({ status: 'error', message: `There is no data of id: ${id}` });
  }
});

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
