const createAsync = require("./../utils/createAsync");
const User = require("./../models/userModal");

exports.signup = createAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
