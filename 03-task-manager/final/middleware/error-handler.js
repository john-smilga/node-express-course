const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  return res.status(500).json({ error: 'Something went wrong try again later' })
}

module.exports = errorHandlerMiddleware
