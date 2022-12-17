const logger = function (req, res, next) {
  const { method, url } = req
  const date = new Date().getFullYear()
  console.log(method, url, date)
  next()
}

module.exports = logger
