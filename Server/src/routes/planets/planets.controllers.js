const { planets } = require("../models/planets.model");

function getPlanets(req, res) {
  return res.status(200).json(planets);
}

module.exports = {
  getPlanets,
};
