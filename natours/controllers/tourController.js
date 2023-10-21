const Tour = require("./../models/tourModel");

exports.getAllTour = async (req, res) => {
  try {

    // Build the Query
    // 1) Filtering
    const queryObject = {...req.query};
    const excludeFields = ['page','sort','limit','fields'];
    excludeFields.forEach((el) => delete queryObject[el]);


    const query = Tour.find(queryObject);
    
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
      runValidators: true
    });
    res.status(200).json({ status: "success", data: tour });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
