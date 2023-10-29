const User = require("../models/userModal");
const createAsync = require("../utils/createAsync");
const AppError = require("../utils/appError");
const { getOne } = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");

/* const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
}); */

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload an image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

const filterObj = (obj, ...args) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (args.includes[el]) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// Users Routers Details
exports.getAllUsers = createAsync(async (req, res, next) => {
  const users = await User.find();
  res
    .status(200)
    .json({ status: "success", results: users.length, data: users });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = createAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This is not a route for change password.", 400));
  }

  const filterBody = filterObj(req.body, "name", "email");
  if (req.file) {
    filterBody.photo = req.file.filename;
  }
  const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteMe = createAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createNewUser = (req, res) => {
  // const newId = "5c8a1d5b0190b214360dc001";
  // const newUser = Object.assign({ id: newId }, req.body);
  // users.push(newUser);
  // fs.writeFile("./dev-data/data/users.json", JSON.stringify(users), (err) => {
  //   res.status(201).json({ status: "success", data: newUser });
  // });
};

exports.getUserById = getOne(User);

exports.deleteUserById = (req, res) => {
  // const { id } = req.params;
  // const newUsers = users.filter((ele) => ele.id !== id);
  // fs.writeFile("./dev-data/data/users.json", JSON.stringify(newUsers), () => {
  //   res
  //     .status(204)
  //     .json({ status: "success", message: "User has been deleted." });
  // });
};

exports.updateUserById = (req, res) => {
  // const { id } = req.params;
  // const newObject = req.body;
  // const userIndex = users.findIndex((ele) => ele.id === id);
  // users[userIndex] = { ...users[userIndex], ...newObject };
  // fs.writeFile("./dev-data/data/users.json", JSON.stringify(users), () => {
  //   res.status(200).json({
  //     status: "success",
  //     message: "User has been update.",
  //     data: newObject,
  //   });
  // });
};
