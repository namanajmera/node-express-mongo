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
  const newId = '5c8a1d5b0190b214360dc001';
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile('./dev-data/data/users.json', JSON.stringify(users), (err) => {
    res.status(201).json({ status: 'success', data: newUser });
  });
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
