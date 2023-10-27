const Review = require("../models/reviewModel");
const {
  deleteOne,
  getOne,
  getAll,
  createOne,
  updateOne,
} = require("./handlerFactory");

exports.getAllReviews = getAll(Review);

exports.setToursUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.addReview = createOne(Review);

exports.getReviewById = getOne(Review);
exports.deleteReviewById = deleteOne(Review);
exports.updateReviewById = updateOne(Review);
