const mongoose = require('mongoose')

const connectDB = function (url) {
  return mongoose.connect(url)
}
module.exports = connectDB
