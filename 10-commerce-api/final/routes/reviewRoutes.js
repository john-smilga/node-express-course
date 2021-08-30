const express = require('express');
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const { authenticateUser } = require('../middleware/authentication');

router.route('/').post(authenticateUser, createReview).get(getAllReviews);

router
  .route('/:id')
  .get(getReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;
