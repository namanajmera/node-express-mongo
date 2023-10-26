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
const { addReview } = require("../controllers/reviewController");
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

// POST /tours/232edsd32/reviews
// GET /tours/232edsd32/reviews
// GET /tours/232edsd32/reviews/123123kjh123kh12
router.route("/tours/:tourId/reviews").post(protect, addReview);
module.exports = router;
