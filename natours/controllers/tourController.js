const APIFeatures = require("../utils/apiFeatures");
const Tour = require("./../models/tourModel");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-ratingsAverage";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTour = async (req, res) => {
  try {
    //  Executing the query.
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.postTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: "success", data: newTour });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Invalid Input" });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(200).json({ status: "success", data: tour });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteTourById = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);
    res.status(204).json({ status: "success", data: tour });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateTourById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedObject = req.body;
    const tour = await Tour.findByIdAndUpdate(id, updatedObject, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: tour });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: {
          ratingsAverage: { $gte: 4.5 },
        },
      },
      {
        $group: {
          _id: '$difficulty',
          mumTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 }
      },
      /* {
        $match: { _id: {$ne: 'easy'}}
      } */
    ]);
    res.status(200).json({ status: "success", data: stats });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
