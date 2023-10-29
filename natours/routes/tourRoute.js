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
  uploadTourImages,
  resizeTourImages,
} = require("../controllers/tourController");
const { protect, restrict } = require("../controllers/authController");
const { addReview } = require("../controllers/reviewController");
const router = express.Router();

// router.param('id', checkId);

router.use(protect);

router.use("/tours/:tourId/reviews", reviewRouter);

router.route("/tours/:tourId/reviews").post(addReview);

router.route("/top-ratings").get(aliasTopTours, getAllTour);

router.route("/tours").get(getAllTour).post(postTour);

router
  .route("/tour/:id")
  .get(getTourById)
  .delete(restrict("admin", "lead-guide"), deleteTourById)
  .patch(
    restrict("admin", "lead-guide"),
    uploadTourImages,
    resizeTourImages,
    updateTourById
  );

router.route("/tour-stats").get(getTourStats);

module.exports = router;
