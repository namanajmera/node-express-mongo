const express = require("express");
const reviewRouter = require("./reviewRoute");
const {
  getAllTour,
  postTour,
  getTourById,
  deleteTourById,
  updateTourById,
  aliasTopTours,
  getTourStats,
} = require("../controllers/tourController");
const { protect, restrict } = require("../controllers/authController");
const { addReview } = require("../controllers/reviewController");
const router = express.Router();

// router.param('id', checkId);

router.use("/tours/:tourId/reviews", reviewRouter);

router.route("/tours/:tourId/reviews").post(protect, addReview);

router.route("/top-ratings").get(aliasTopTours, getAllTour);

router.route("/tours").get(protect, getAllTour).post(postTour);

router
  .route("/tour/:id")
  .get(getTourById)
  .delete(protect, restrict("admin", "lead-guide"), deleteTourById)
  .patch(updateTourById);

router.route("/tour-stats").get(getTourStats);

module.exports = router;
