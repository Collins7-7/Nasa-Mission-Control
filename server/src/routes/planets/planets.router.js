const express = require("express");

const { httpGetPlanets } = require("./planets.controllers");

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetPlanets);

module.exports = planetsRouter;
