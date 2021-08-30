const Order = require('../models/Order');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const checkPermissions = require('../utils/checkPermissions');

const fakeStripeAPI = async ({ amount, currency }) => {
  const clientSecret = 'someRandomValue';
  return { clientSecret, amount };
};

const createOrder = async (req, res) => {
  const { cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items in the order');
  }

  let orderItems = [];
  let subtotal = 0;
  for (const item of cartItems) {
    const dbProduct = await Product.findById(item.product);
    const { name, price, image, _id } = dbProduct;
    // add to subtotal
    subtotal += item.amount * price;
    // add to the order items
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
  }
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.clientSecret,
    user: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json(order);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  const isAllowedAccess = checkPermissions(req.user, order);
  if (!isAllowedAccess) {
    throw new CustomError.UnauthorizedError(
      'Not authorized to view this order'
    );
  }
  res.status(StatusCodes.OK).json({ order });
};

const getAllUsersOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentID } = req.body;
  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  const isAllowedAccess = checkPermissions(req.user, order);
  if (!isAllowedAccess) {
    throw new CustomError.UnauthorizedError(
      'Not authorized to view this order'
    );
  }
  order.paymentIntentID = paymentIntentID;
  order.status = 'paid';
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getOrder,
  getAllUsersOrders,
  createOrder,
  updateOrder,
};
