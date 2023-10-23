const express = require("express");
const {
  getAllTour,
  postTour,
  getTourById,
  deleteTourById,
  checkId,
  checkBody,
  updateTourById,
  aliasTopTours,
  getTourStats,
} = require("../controllers/tourController");
const { protect, restrict } = require("../controllers/authController");
const router = express.Router();

// router.param('id', checkId);

router.route("/top-ratings").get(aliasTopTours, getAllTour);

router.route("/tours").get(protect, getAllTour).post(postTour);

router
  .route("/tour/:id")
  .get(getTourById)
  .delete(protect, restrict("admin", "lead-guide"), deleteTourById)
  .put(updateTourById);

router.route("/tour-stats").get(getTourStats);
module.exports = router;
