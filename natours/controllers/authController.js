const { promisify } = require("util");
const createAsync = require("./../utils/createAsync");
const User = require("./../models/userModal");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");

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

exports.protect = createAsync(async (req, res, next) => {
  // 1. Getting the token and check its there or not.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    next(new AppError("You are not login. Please login to get access.", 401));
  }
  // 2. Verification Token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //  3. Check if user still exist.
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError("Token Invalid. Please login with the existing user.", 401)
    );
  }

  // 4. Check the password is modified or not.
  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError(
        "User recently changed the password! Please login again.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrict = (...roles) => {
  return createAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have access to delete the tour", 403)
      );
    }
    next();
  });
};

exports.forgotPassword = createAsync(async (req, res, next) => {
  // 1. Get user based on Posted Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with this email address", 404));
  }

  //  2. Generate the random reset Token
  const resetToken = user.createPasswordResetToken();
  console.log({ resetToken });
  await user.save({ validateBeforeSave: false });

  // 3. Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with our new password and passwordConfirm to: ${resetURL}.\nIf you didn't forgot your password, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token send to email.",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("THere is an issue sending email. Try again later", 500)
    );
  }

  next();
});

exports.resetPassword = createAsync(async (req, res, next) => {
  next();
});
