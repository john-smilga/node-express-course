const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating,'],
    },
    something: {
      type: Number,
      min: 1,
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    // look for reviews associated with a product
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  // optional chaining
  // console.log(result[0]?.averageRating || 'does not exist');
  // optionally Math.ceil()
  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      averageRating: result[0]?.averageRating || 0,
    });
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  console.log(this.model('Product'));
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
