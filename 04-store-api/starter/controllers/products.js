const Product = require("../models/product");

const getAllProducts = async (req, res) =>
  res.status(200).json({ msg: "product testing routed" });
const getAllProductStatic = async (req, res) => {
  const allStaticProducts = await Product.find();
  if (!allStaticProducts) {
    throw new Error("Error Happend");
  }
  res.status(200).json({ allStaticProducts, nbHits: allStaticProducts.length });
};

module.exports = {
  getAllProductStatic,
  getAllProducts,
};
