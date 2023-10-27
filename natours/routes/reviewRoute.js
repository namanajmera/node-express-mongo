const express = require("express");
const {
  getAllReviews,
  getReviewById,
  addReview,
  deleteReviewById,
  setToursUserIds,
  updateReviewById,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, getAllReviews)
  .post(protect, setToursUserIds, addReview);

router
  .route("/:id")
  .get(protect, getReviewById)
  .delete(protect, deleteReviewById)
  .patch(protect, updateReviewById);

module.exports = router;
