const { query } = require("express");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "product testing routed" });
};
const getAllProductStatic = async (req, res) => {
  const { featured } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
    console.log(queryObject);
  }
  const allStaticProducts = await Product.find(queryObject);

  res.status(200).json({ allStaticProducts, nbHits: allStaticProducts.length });
};

module.exports = {
  getAllProductStatic,
  getAllProducts,
};
