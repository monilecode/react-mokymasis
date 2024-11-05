const express = require("express");
const { getServices } = require("./queries/get-services");
const { createService } = require("./mutations/create-service");
const { getServicesByCategory } = require("./queries/get-services-by-category");
const { getServiceById } = require("./queries/get-service-by-id");
const { updateService } = require("./mutations/update-service");

const servicesRouter = express.Router();

servicesRouter.get("/", getServices);
servicesRouter.post("/", createService);
servicesRouter.get("/category/:category", getServicesByCategory);
servicesRouter.get("/:id", getServiceById);
servicesRouter.put("/:id", updateService);

module.exports = {
  servicesRouter,
};
