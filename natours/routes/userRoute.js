const express = require("express");
const {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  updateUserById,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
} = require("../controllers/userController");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} = require("../controllers/authController");

const router = express.Router();

// router.param("id", checkId);

router.post("/users/signup", signup);
router.post("/users/login", login);
router.post("/users/forgotPassword", forgotPassword);
router.patch("/users/resetPassword/:token", resetPassword);

router.use(protect);

router.patch("/users/updatePassword", updatePassword);

router.get("/users/me", getMe, getUserById);
router.patch("/users/updateMe", uploadUserPhoto, updateMe);
router.delete("/users/deleteMe", deleteMe);

// For Users Routes
router.route("/users").get(getAllUsers).post(createNewUser);

router
  .route("/user/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

module.exports = router;
