const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const createAsync = require("../utils/createAsync");

exports.getAllReviews = createAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.addReview = createAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;

  const review = await Review.create(req.body);
  if (!review) throw new AppError("No review created", 401);
  res.status(201).json({
    status: "success",
    message: "Review added successfully!",
    data: {
      review,
    },
  });
});

exports.getReviewById = createAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError(`No tour find of ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
