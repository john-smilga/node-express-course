const notFound = (req, res) => {
  res.status(404).send("Route doesn't exists");
};

module.exports = notFound;
