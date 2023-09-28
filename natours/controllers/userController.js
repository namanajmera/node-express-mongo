const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8')
);

// Users Routers Details
exports.getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};

exports.createNewUser = (req, res) => {
  const reqBody = req.body;
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};

exports.getUserById = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};
exports.deleteUserById = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};
exports.updateUserById = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};
