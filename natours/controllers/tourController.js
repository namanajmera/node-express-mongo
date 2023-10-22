const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const Tour = require("./../models/tourModel");
const createAsync = require("./../utils/createAsync");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-ratingsAverage";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTour = createAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTIme,
    results: tours.length,
    data: { tours },
  });
});

exports.postTour = createAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({ status: "success", data: newTour });
});

exports.getTourById = createAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);

  if (!tour) {
    return next(new AppError(`No tour find of ${id}`, 404));
  }
  res.status(200).json({ status: "success", data: tour });
});

exports.deleteTourById = createAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) {
    return next(new AppError(`No tour find of ${id}`, 404));
  }
  res.status(204).json({ status: "success", data: tour });
});

exports.updateTourById = createAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedObject = req.body;
  const tour = await Tour.findByIdAndUpdate(id, updatedObject, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError(`No tour find of ${id}`, 404));
  }
  res.status(200).json({ status: "success", data: tour });
});

exports.getTourStats = createAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: "$difficulty",
        mumTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    /* {
        $match: { _id: {$ne: 'easy'}}
      } */
  ]);
  res.status(200).json({ status: "success", data: stats });
});
