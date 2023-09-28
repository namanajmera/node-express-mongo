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
// Fetch The Data from file

const fileData = fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8');
const tours = JSON.parse(fileData);
const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8')
);

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

// Users Routers Details
const getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};

const createNewUser = (req, res) => {
  const reqBody = req.body;
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};

const getUserById = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};
const deleteUserById = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};
const updateUserById = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};

// New Method to Wrap the routes.

const tourRouter = express.Router();
const usersRouter = express.Router();

tourRouter.route('/tours').get(getAllTour).post(postTour);

tourRouter.route('/tour/:id').get(getTourById).delete(deleteTourById);

// For Users Routes
usersRouter.route('/users').get(getAllUsers).post(createNewUser);

usersRouter
  .route('/user/:id')
  .get(getUserById)
  .delete(deleteUserById)
  .patch(updateUserById);

app.use('/api/v1', tourRouter);
app.use('/api/v1', usersRouter);

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
