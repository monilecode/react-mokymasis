const { services } = require("../mock-services");

function updateService(req, res) {
  const { id } = req.params;
  const { heading, img, name, address, categoryTag } = req.body;

  const serviceIndex = services.findIndex(
    (service) => service.id === Number(id)
  );

  if (serviceIndex !== -1) {
    services[serviceIndex] = {
      ...services[serviceIndex],
      heading,
      img,
      name,
      address,
      categoryTag,
    };
    res.json(services[serviceIndex]);
  } else {
    res.status(404).json({ message: "Service not found" });
  }
}

module.exports = {
  updateService,
};
