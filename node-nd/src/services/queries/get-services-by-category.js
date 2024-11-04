const { services } = require("../mock-services");

function getServicesByCategory(req, res) {
  const { category } = req.params;
  console.log(category);
  const filteredServices = services.filter(
    (service) => service.categoryTag.toLowerCase() === category.toLowerCase()
  );
  res.json(filteredServices);
}

module.exports = {
  getServicesByCategory,
};