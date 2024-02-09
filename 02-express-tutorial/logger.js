///MIDDLE WARE, consider it as a helper function
///so that you don't have to keep repeating the same code
//again and again.

// the function logger is a middleware,
// We don't need to pass the req,res parameters when calling the function
const logger = (req, res, next) => {
  const method = req.method;
  const time = new Date().getFullYear();
  const path = req.url;
  console.log(method, time, path);
  next();
  /// you need to pass or return something when using middleware other wise it will left hanging
};

module.exports = logger;
