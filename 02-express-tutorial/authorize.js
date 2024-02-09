const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "jhon") {
    req.user = { name: "jhon", id: 4 };
    next();
  } else {
    res.status(401).send("invalid user");
  }
};

module.exports = authorize;
