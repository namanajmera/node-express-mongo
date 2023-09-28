const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// Setting up the port.
const port = process.env.PORT;
// Listening to the server

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
