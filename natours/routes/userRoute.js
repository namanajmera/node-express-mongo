const express = require("express");
const {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  updateUserById,
  checkId,
} = require("../controllers/userController");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.param("id", checkId);

router.post("/users/signup", signup);
router.post("/users/login", login);

// For Users Routes
router.route("/users").get(getAllUsers).post(createNewUser);

router
  .route("/user/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

module.exports = router;
