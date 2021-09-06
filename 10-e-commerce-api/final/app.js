require('dotenv').config();
require('express-async-errors');

// packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// express
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

// routers
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { authenticateUser } = require('./middleware/authentication');

app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

// security packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 150 }));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', authenticateUser, orderRouter);

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
