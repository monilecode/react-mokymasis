const { services } = require("../mock-services");

function createService(req, res) {
  const newId = services.length + 1;
  services.push({
    id: newId,
    heading: req.body.heading,
    img: req.body.img,
    name: req.body.name,
    address: req.body.address,
    categoryTag: req.body.categoryTag,
  });

  res.json({
    success: true,
    message: "Service added successfully",
    serviceId: newId,
  });
}

module.exports = {
  createService,
};
