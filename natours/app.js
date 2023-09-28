// Imports
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

// Setting up to the app variable to call others.
const app = express();

//MiddleWares
app.use(morgan('dev'));

// For use the body in request.
app.use(express.json());

// Custom Middleware
app.use((req, res, next) => {
  console.log('Hello, I am from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTIme = new Date().toISOString();
  next();
});

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

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTIme,
    results: tours.length,
    data: { tours },
  });
};

const postTour = (req, res) => {
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
};

const getTourById = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((ele) => ele.id === Number(id));
  if (tour) {
    res.status(200).json({ status: 'success', data: tour });
  } else {
    res
      .status(404)
      .json({ status: 'error', message: `There is no data of id: ${id}` });
  }
};

const deleteTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);
  const updatedTours = tours.filter((ele) => ele.id !== id);
  if (tour) {
    fs.writeFile(
      './dev-data/data/tours-simple.json',
      JSON.stringify(updatedTours),
      (err) => {
        res.status(204).json({ status: 'success' });
      }
    );
  } else {
    res
      .status(404)
      .json({ status: 'error', message: `There is no data of id: ${id}` });
  }
};

/* // Get the Tours List
app.get('/api/v1/tours', getAllTour);

// Post a New Tour
app.post('/api/v1/tours', postTour);

// Get tour by id
app.get('/api/v1/tour/:id', getTourById);

// Delete the Tour
app.delete('/api/v1/tour/:id', deleteTourById); */

// New Method to Wrap the routes.
app.route('/api/v1/tours').get(getAllTour).post(postTour);

app.route('/api/v1/tour/:id').get(getTourById).delete(deleteTourById);

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
