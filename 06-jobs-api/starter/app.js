require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const auth = require("./middleware/authentication");
//routes
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

//db
const connectDb = require("./db/connect");

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", auth, jobsRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
