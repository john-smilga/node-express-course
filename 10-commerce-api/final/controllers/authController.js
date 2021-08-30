const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createJWT, sendResponseWithCookie } = require('../utils/jwt');

// Public Route
// Register User   =>    POST /api/v1/auth/register

const register = async (req, res) => {
  const { email } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const user = await User.create(req.body);

  sendResponseWithCookie({
    res,
    statusCode: StatusCodes.OK,
    user: { name: user.name, userId: user._id, role: user.role },
  });
};

// Public Route
// Login User   =>    POST /api/v1/auth/login

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  sendResponseWithCookie({
    res,
    statusCode: StatusCodes.OK,
    user: { name: user.name, userId: user._id, role: user.role },
  });
};

// Public Route
// Logout User   =>    GET /api/v1/auth/logout

const logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
