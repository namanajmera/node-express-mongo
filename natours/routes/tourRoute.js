const express = require('express');
const {
  getAllTour,
  postTour,
  getTourById,
  deleteTourById,
} = require('../controllers/tourController');
const router = express.Router();

router.route('/tours').get(getAllTour).post(postTour);

router.route('/tour/:id').get(getTourById).delete(deleteTourById);

module.exports = router;
