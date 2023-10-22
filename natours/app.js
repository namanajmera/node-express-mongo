// Imports
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoute");
const usersRouter = require("./routes/userRoute");

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
  /* res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on the server`,
  }); */
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  err.statusCode = 404;
  err.status = "fail";
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
