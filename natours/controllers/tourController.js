const Tour = require("./../models/tourModel");

exports.getAllTour = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTIme,
    results: tours.length,
    data: { tours },
  });
};

exports.postTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: "success", data: newTour });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Invalid Input" });
  }
};

exports.getTourById = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: "success" /*  data: tour */ });
};

exports.deleteTourById = (req, res) => {
  const id = req.params.id * 1;
  res.status(204).json({ status: "success" });
};

exports.updateTourById = (req, res) => {
  const id = req.params.id * 1;
  const updatedObject = req.body;
  res.status(200).json({ status: "success", data: "tours[tourIndex]" });
};
