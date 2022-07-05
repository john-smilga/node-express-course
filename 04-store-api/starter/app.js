require("dotenv").config();
require('express-async-errors');
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

const port = process.env.PORT || 3000;
// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/products", productsRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    //connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
