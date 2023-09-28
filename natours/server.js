const app = require('./app');

// Setting up the port.
const port = 8080;
// Listening to the server

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
