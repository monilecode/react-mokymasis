const { services } = require("../mock-services");

function getServiceById(req, res) {
  const { id } = req.params;
  const service = services.find((service) => service.id === parseInt(id, 10));

  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: "Service not found" });
  }
}

module.exports = {
  getServiceById,
};
