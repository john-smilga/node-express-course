const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');

const {
  authenticateUser,
  authorizeRoles,
} = require('../middleware/authentication');

router
  .route('/')
  .post([authenticateUser, authorizeRoles('admin')], createProduct)
  .get(getAllProducts);
router
  .route('/uploadImage')
  .post([authenticateUser, authorizeRoles('admin')], uploadImage);
router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizeRoles('admin')], updateProduct)
  .delete([authenticateUser, authorizeRoles('admin')], deleteProduct);

module.exports = router;
