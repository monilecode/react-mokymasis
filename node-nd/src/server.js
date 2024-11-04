const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const { categoriesRouter } = require("./categories");
const { servicesRouter } = require("./services");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev"));
app.use("/categories", categoriesRouter);
app.use("/services", servicesRouter);

app.listen(process.env.API_PORT, () => {
  console.log(
    `Server is running on ${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`
  );
});
