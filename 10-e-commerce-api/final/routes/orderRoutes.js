const express = require('express');
const router = express.Router();

const { authorizeRoles } = require('../middleware/authentication');

const {
  createOrder,
  getAllOrders,
  getAllUsersOrders,
  getOrder,
  updateOrder,
} = require('../controllers/orderController');

router.route('/').post(createOrder).get(authorizeRoles('admin'), getAllOrders);
router.route('/showAllMyOrders').get(getAllUsersOrders);

router.route('/:id').get(getOrder).patch(updateOrder);

module.exports = router;
