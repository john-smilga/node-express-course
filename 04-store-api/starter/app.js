<<<<<<< HEAD
require('dotenv').config()
//async errors
require('express-async-errors')

const express = require('express')

const app = express()
const connectDB = require('./db/connect')
const productRouter=require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/', (req, res) => {
  res.send('<h1>Store api</h1><a href="/api/v1/products">products</a>')
})
app.use('/api/v1/products',productRouter)
//products route

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000
const start = async () => {
  try {
    //connectDb return a promise
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is running in ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
=======
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
>>>>>>> 903c21e04f1f41b763ed6ae3f3235ce0a2b9a628
