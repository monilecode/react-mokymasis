const express = require("express");
const { getServices } = require("./queries/get-services");
const { createService } = require("./mutations/create-service");
const { getServicesByCategory } = require("./queries/get-services-by-category");

const servicesRouter = express.Router();

servicesRouter.get("/", getServices);
servicesRouter.post("/", createService);
servicesRouter.get("/category/:category", getServicesByCategory);

module.exports = {
  servicesRouter,
};
