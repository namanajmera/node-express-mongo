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

router.use(protect);

router.route("/").get(getAllReviews).post(setToursUserIds, addReview);

router
  .route("/:id")
  .get(getReviewById)
  .delete(deleteReviewById)
  .patch(updateReviewById);

module.exports = router;
