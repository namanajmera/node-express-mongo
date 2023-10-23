const createAsync = require("./../utils/createAsync");
const User = require("./../models/userModal");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = createAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = createAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //   1) Check if email and password exist or not..
  if (!email || !password) {
    return next(new AppError("Please provide the email or password", 400));
  }

  //   2) Check if user exist && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 404));
  }

  //    3) If everything is ok, send the token
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
