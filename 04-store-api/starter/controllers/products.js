const { query } = require("express");
const Product = require("../models/product");

const getAllProductStatic = async (req, res) => {
  const products = await Product.find({}).sort("name");

  res.status(200).json({ products });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
    console.log(queryObject);
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = name;
  }

  let products = Product.find(queryObject);
  if (sort) {
    console.log(sort);
    products = products.sort(sort);
  }

  const result = await products;
  console.log(queryObject);

  res.status(200).json({ result, nbHits: result.length });
};

module.exports = {
  getAllProductStatic,
  getAllProducts,
};
