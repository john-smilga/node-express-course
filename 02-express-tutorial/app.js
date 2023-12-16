const express = require("express");
const app = express();
const logger = require("./logger");
const data = require("./data");
const authorize = require("./authorize");
// use app.use(middleware function) in order to invoke it in all the routes without manually adding them
// here in the home page logger is called without passing the parameter.

// if you want to add app.use(middleware) in only some path then,
// app.use("/path", middleware);
// this will call the middleware on all the routes beginning with the /paht'

//app.use([middleware1, middleware2, middleware3])
// you can use multiple middlewares as well
// however it works in asceding order of the array
//so we have to be careful of the order and which middleware to put first.
//for e.g. app.use([authorize, logger])

app.use([authorize, logger]);
// IMPORTANT NOTE:
// MIDDLEWARE IS POWERFUL BECAUSE YOU CAN
//ACCESS IT AND IT'S DATA FROM ANYWHERE

app.get("/", (req, res) => {
  console.log(req.user);
  res.send("home");
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
