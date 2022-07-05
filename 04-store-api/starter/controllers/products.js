const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ name:'vase table'});
  res.status(200).json({ products,nbHits: products.length});

  // throw new Error express-async-errors is used to handle async errors without having to use try/catch blocks and call next(err) in the error handler. This is useful for error handling in production.
};
const getAllProducts = (req, res) => {
  res.status(200).json({ msg: "products  route" });
};

module.exports = { getAllProductsStatic, getAllProducts };
