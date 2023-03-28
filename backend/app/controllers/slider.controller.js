const db = require("../models");
const Slider = db.slider;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Slider.find({})
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};