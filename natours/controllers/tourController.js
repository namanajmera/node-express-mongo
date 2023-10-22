const Tour = require("./../models/tourModel");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-ratingsAverage";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTour = async (req, res) => {
  try {
    // Build the Query
    // 1) Filtering
    const queryObject = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObject[el]);

    let query = Tour.find(queryObject);

    // 2 Sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // 3. Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4. Page and Limits.
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10000;
    const skip = page * limit - limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const countTour = await Tour.countDocuments();
      if (skip >= countTour) throw new Error("This page does not exist.");
    }

    //  Executing the query.
    const tours = await query;

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
