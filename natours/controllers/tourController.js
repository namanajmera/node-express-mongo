const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTIme,
    results: tours.length,
    data: { tours },
  });
};

exports.postTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newObject = Object.assign({ id: newId }, req.body);
  tours.push(newObject);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: newObject });
    }
  );
};

exports.getTourById = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((ele) => ele.id === Number(id));
  if (tour) {
    res.status(200).json({ status: 'success', data: tour });
  } else {
    res
      .status(404)
      .json({ status: 'error', message: `There is no data of id: ${id}` });
  }
};

exports.deleteTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);
  const updatedTours = tours.filter((ele) => ele.id !== id);
  if (tour) {
    fs.writeFile(
      './dev-data/data/tours-simple.json',
      JSON.stringify(updatedTours),
      (err) => {
        res.status(204).json({ status: 'success' });
      }
    );
  } else {
    res
      .status(404)
      .json({ status: 'error', message: `There is no data of id: ${id}` });
  }
};
