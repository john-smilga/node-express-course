const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// Protected Route / Admin Only
// Get All Users   =>    GET /api/v1/users

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

// Protected Route / Admin or User
// Get Single User   =>    GET /api/v1/users/:id

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

// Protected Route / Admin or User
// Show Current User   =>    GET /api/v1/users/showMe

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
};
