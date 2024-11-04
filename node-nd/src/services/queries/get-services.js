const { services } = require("../mock-services");

function getServices(req, res) {
  res.json(services);
}

module.exports = {
  getServices,
};
