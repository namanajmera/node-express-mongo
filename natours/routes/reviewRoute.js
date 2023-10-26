const express = require("express");
const {
  getAllReviews,
  getReviewById,
  addReview,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");
const router = express.Router();

router.route("/").get(protect, getAllReviews).post(protect, addReview);

router.route("/:id").get(protect, getReviewById);

module.exports = router;
