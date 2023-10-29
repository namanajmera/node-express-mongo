const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const createAsync = require("../utils/createAsync");

exports.deleteOne = (Model) =>
  createAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError(`No document find of ${id}`, 404));
    }
    res.status(204).json({ status: "success", data: doc });
  });

exports.getOne = (Model, popOptions) =>
  createAsync(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No document find of ${id}`, 404));
    }
    res.status(200).json({ status: "success", data: doc });
  });

exports.getAll = (Model) =>
  createAsync(async (req, res, next) => {
    const filter = {};
    if (req.params.tourId) {
      filter.tour = req.params.tourId;
    }
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    // const doc = await features.query.explain();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTIme,
      results: doc.length,
      data: { doc },
    });
  });

exports.createOne = (Model) =>
  createAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) throw new AppError("No doc created", 401);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.updateOne = (Model) =>
  createAsync(async (req, res, next) => {
    const id = req.params.id;
    const updatedObject = req.body;
    const doc = await Model.findByIdAndUpdate(id, updatedObject, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError(`No doc find of ${id}`, 404));
    }
    res.status(200).json({ status: "success", data: doc });
  });
