const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8')
);

exports.checkId = (req, res, next, val) => {
  const user = users.find((ele) => ele.id === val);
  if (!user) {
    return res
      .status(404)
      .json({ status: 'error', message: `There is no data of id: ${val}` });
  }
  next();
};

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
  const { id } = req.params;
  const user = users.find((ele) => ele.id === id);
  res.status(200).json({ status: 'success', data: user });
};

exports.deleteUserById = (req, res) => {
  const { id } = req.params;
  const newUsers = users.filter((ele) => ele.id !== id);
  fs.writeFile('./dev-data/data/users.json', JSON.stringify(newUsers), () => {
    res
      .status(204)
      .json({ status: 'success', message: 'User has been deleted.' });
  });
};

exports.updateUserById = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
};
