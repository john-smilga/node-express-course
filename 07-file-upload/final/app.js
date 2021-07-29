require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// express file upload
const fileUpload = require('express-fileupload');
// claudinary file upload
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require('./db/connect');

// routers
const productRouter = require('./routes/productRoutes');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json());
// use temp files for cloudinary
app.use(fileUpload({ useTempFiles: true }));

// products
app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
