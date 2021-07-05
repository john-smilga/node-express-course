const User = require('../models/User')
const { UnauthenticatedError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createToken()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password', 400)
  }
  const user = await User.findOne({ email })
  // if empty bcryptjs will throw error
  const isPasswordCorrect = await user.checkPassword(password)

  if (!user || !isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = await user.createToken()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
}
