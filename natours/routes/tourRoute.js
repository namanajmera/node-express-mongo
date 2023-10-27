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

router.route("/top-ratings").get(aliasTopTours, protect, getAllTour);

router.route("/tours").get(protect, getAllTour).post(protect, postTour);

router
  .route("/tour/:id")
  .get(protect, getTourById)
  .delete(protect, restrict("admin", "lead-guide"), deleteTourById)
  .patch(protect, updateTourById);

router.route("/tour-stats").get(protect, getTourStats);

module.exports = router;
