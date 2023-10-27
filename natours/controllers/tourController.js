const Tour = require("./../models/tourModel");
const createAsync = require("./../utils/createAsync");
const {
  deleteOne,
  getOne,
  getAll,
  createOne,
  updateOne,
} = require("./handlerFactory");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-ratingsAverage";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTour = getAll(Tour);
exports.postTour = createOne(Tour);
exports.getTourById = getOne(Tour);
exports.deleteTourById = deleteOne(Tour);
exports.updateTourById = updateOne(Tour);

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
