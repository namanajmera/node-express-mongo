const express = require("express");
const {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  updateUserById,
  updateMe,
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

router.patch("/users/updatePassword", protect, updatePassword);

router.patch("/users/updateMe", protect, updateMe);

// For Users Routes
router.route("/users").get(protect, getAllUsers).post(createNewUser);

router
  .route("/user/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

module.exports = router;
