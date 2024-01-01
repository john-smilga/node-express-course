const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "product testing routed" });
};
const getAllProductStatic = async (req, res) => {
  res.status(200).json({ msg: "product  route" });
};

module.exports = {
  getAllProductStatic,
  getAllProducts,
};
