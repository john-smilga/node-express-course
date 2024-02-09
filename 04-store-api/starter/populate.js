require("dotenv").config();
const connectDb = require("./db/connect");
const Product = require("./models/product");

const jsonProduct = require("./products.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    console.log("success");

    await Product.create(jsonProduct);
    console.log("added products successfully");
  } catch (error) {
    console.log(error);
  }
};

start();
