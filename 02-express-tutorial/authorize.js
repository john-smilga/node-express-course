const authorize = function (req, res, next) {
  const query = req.query
  if (query.user === 'kourosh') {
    req.user = { name: 'kourosh', id: 20 }
    next()
  } else {
    res.send('Not allow').sttus(401)
  }
}

module.exports = authorize
