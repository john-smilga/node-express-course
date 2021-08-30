const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const checkPermissions = require('../utils/checkPermissions');
// Protected Route / Admin or User
// Create Review   =>    POST /api/v1/reviews

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

// Public Route
// Get All Reviews   =>    GET /api/v1/reviews

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'product',
    select: 'name company price',
  });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

// Public Route
// Get Single Review   =>    GET /api/v1/reviews/:id

const getReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

// Protected Route / Admin or User
// Update Review  =>    PATCH /api/v1/reviews/:id

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${reviewId}`);
  }
  // review user is an object
  // console.log(typeof review.user);

  const isAllowedAccess = checkPermissions(req.user, review);
  if (!isAllowedAccess) {
    throw new CustomError.UnauthorizedError(
      'Not authorized to update this review'
    );
  }
  const updatedReview = await Review.findOneAndUpdate(
    { _id: reviewId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedReview });
};

// Protected Route / Admin or User
// Delete Review =>    DELETE /api/v1/reviews/:id

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${reviewId}`);
  }
  const isAllowedAccess = checkPermissions(req.user, review);
  if (!isAllowedAccess) {
    throw new CustomError.UnauthorizedError(
      'Not authorized to delete this review'
    );
  }
  review.remove();
  res.status(StatusCodes.OK).json({ msg: 'success! review removed' });
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
