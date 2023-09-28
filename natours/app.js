// Imports
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoute');
const usersRouter = require('./routes/userRoute');

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

// All Routers
app.use('/api/v1', tourRouter);
app.use('/api/v1', usersRouter);

module.exports = app;
