const express = require("express");
const app = express();

const data = require("./data");

app.get("/", (req, res) => {
  res.send("<h1>Welcome to home</h1> <a href='/api/products'> Products </a");
});

app.get("/api/products", (req, res) => {
  const newProduct = data.products.map((product) => {
    const { item, name, image } = product;
    return { item, name, image };
  });
  res.json(newProduct);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const searchedProduct = data.products.find((product) => product.id == id);
  if (!searchedProduct) {
    res.status(404).send("Product doesn't exist");
  }
  res.json(searchedProduct);
});

app.get("/api/products/:id/reviews/:reviewId", (req, res) => {
  console.log(req.params);
  res.send("received");
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...data.products];

  // ONE REQUEST CAN ONLY SEND ONE RESPONSE SO IF YOU HAVE MULTIPLE IF
  // CONDITIONS THEN ALWAYS SET RETURN
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    return (sortedProducts = sortedProducts.slice(0, Number(limit)));
  }
  if (sortedProducts.length === 0) {
    return res
      .status(200)
      .json({ request: "successful", data: "Can not find the product" });
  }
  res.json(sortedProducts);
  console.log(req.query);
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
