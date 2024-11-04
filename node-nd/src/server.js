const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

const categories = [
  {
    id: 1,
    category: "cleaning",
    icon: "/src/components/categories/images/cleaning.png",
    alt: "cleaning",
  },
  {
    id: 2,
    category: "repair",
    icon: "/src/components/categories/images/repair.png",
    alt: "repair",
  },
  {
    id: 3,
    category: "painting",
    icon: "/src/components/categories/images/painting.png",
    alt: "painting",
  },
  {
    id: 4,
    category: "shifting",
    icon: "/src/components/categories/images/shifting.png",
    alt: "shifting",
  },
  {
    id: 5,
    category: "plumbing",
    icon: "/src/components/categories/images/plumbing.png",
    alt: "plumbing",
  },
  {
    id: 6,
    category: "electric",
    icon: "/src/components/categories/images/electric.png",
    alt: "electric",
  },
];

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.post("/api/categories", (req, res) => {
  const newId = categories.length + 1;
  categories.push({ id: newId, name: req.body.name });

  res.json({
    success: true,
    message: "Category added successfully",
    categoryId: newId,
  });
});

app.listen(process.env.API_PORT, () => {
  console.log(
    `Server is running on ${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`
  );
});
