const jwt = require("jsonwebtoken");
const customApiError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new customApiError("No Authorization token provided", 400);
  }

  const token = authorization.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new customApiError("Not authorized", 401);
  }
};
module.exports = authenticationMiddleware;
