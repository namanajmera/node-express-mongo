const express = require('express');
const {
  getAllTour,
  postTour,
  getTourById,
  deleteTourById,
  checkId,
  checkBody,
  updateTourById,
  aliasTopTours,
} = require('../controllers/tourController');
const router = express.Router();

// router.param('id', checkId);

router.route('/top-ratings').get(aliasTopTours, getAllTour);

router.route('/tours').get(getAllTour).post(postTour);

router
  .route('/tour/:id')
  .get(getTourById)
  .delete(deleteTourById)
  .put(updateTourById);

module.exports = router;
