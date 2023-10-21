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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Tour must have a Name."],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Tour must have a Price."],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 500,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("Error 🔥:", err);
  });

// Setting up the port.
const port = process.env.PORT;
// Listening to the server

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
