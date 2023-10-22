const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Get the  Mongo DB URL Connection String
const DB = process.env.DATABASE;

// NO make a connection to DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected To ${process.env.DATABASE} Successfully`));

// Setting up the port.
const port = process.env.PORT;
// Listening to the server

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

process.on('unhandledRejection' ,err => {
  process.exit(1);
})