const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const OrderSchema = mongoose.Schema({
  tax: {
    type: Number,
    required: true,
    default: 499,
  },
  shippingFee: {
    type: Number,
    required: true,
    default: 499,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  orderItems: [SingleOrderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  paymentIntentID: {
    type: String,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
