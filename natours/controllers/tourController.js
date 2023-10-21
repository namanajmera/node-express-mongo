const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Mandatory fields are: name and price, you have to fill this.',
    });
  }
  next();
};

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTIme,
    /* results: tours.length,
    data: { tours }, */
  });
};

exports.postTour = (req, res) => {
  const newObject = Object.assign({ id: 1 }, req.body);
    res.status(201).json({ status: 'success', data: newObject });
};

exports.getTourById = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: 'success',/*  data: tour */ });
};

exports.deleteTourById = (req, res) => {
  const id = req.params.id * 1;
      res.status(204).json({ status: 'success' });
};

exports.updateTourById = (req, res) => {
  const id = req.params.id * 1;
  const updatedObject = req.body;
    res.status(200).json({ status: 'success', data: "tours[tourIndex]" });
};
