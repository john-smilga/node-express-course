require("dotenv").config();
require("express-async-errors");
//async errors

const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const productRouter = require("./routes/products");
//error handlers
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API </h1> <a href='/api/v1/products'>Products route</a>");
});

app.use("/api/v1/products", productRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
