<<<<<<< HEAD
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'product name must be provided'] },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  featured: { type: Boolean, default: false },
=======
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  feature: {
    type: Boolean,
    default: true,
  },
>>>>>>> 903c21e04f1f41b763ed6ae3f3235ce0a2b9a628
  rating: {
    type: Number,
    default: 4.5,
  },
<<<<<<< HEAD
  cratedAt: {
=======
  createdAt: {
>>>>>>> 903c21e04f1f41b763ed6ae3f3235ce0a2b9a628
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
<<<<<<< HEAD
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported',
    },
  },
})

module.exports = mongoose.model('Product', productSchema)
=======
      values: ["ikea","liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    //enum:['iddy','caressa','marcos']
  },
});
module.exports = mongoose.model("Product", productSchema);
>>>>>>> 903c21e04f1f41b763ed6ae3f3235ce0a2b9a628
