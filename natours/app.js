// Imports
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoute");
const usersRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// Setting up to the app variable to call others.
const app = express();

//MiddleWares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// For use the body in request.
app.use(express.json());

app.use(express.static("./public"));

// Custom Middleware
app.use((req, res, next) => {
  console.log("Hello, I am from middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTIme = new Date().toISOString();
  next();
});

// All Routers
app.use("/api/v1", tourRouter);
app.use("/api/v1", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
