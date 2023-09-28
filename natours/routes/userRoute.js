const express = require('express');
const {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  updateUserById,
} = require('../controllers/userController');

const router = express.Router();

// For Users Routes
router.route('/users').get(getAllUsers).post(createNewUser);

router
  .route('/user/:id')
  .get(getUserById)
  .delete(deleteUserById)
  .patch(updateUserById);

module.exports = router;
