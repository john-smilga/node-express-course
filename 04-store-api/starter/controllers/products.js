const { query } = require("express");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const testname = "ab";
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
    console.log(queryObject);
  }
  if (company) {
    queryObject.company = company;
  }
  // if (name) {
  //   queryObject.name = name;
  // }

  const products = await Product.find({ name: { $regex: testname } });
  res.status(200).json({ products, nbHits: products.length });
};
const getAllProductStatic = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

module.exports = {
  getAllProductStatic,
  getAllProducts,
};
