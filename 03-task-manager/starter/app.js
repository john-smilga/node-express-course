const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.json());
app.use("/api/v1/tasks", tasks);
require("dotenv").config();
app.use(express.static("./public"));
app.use(notFound);

//routes

app.get("/", (req, res) => {
  res.send("task manager app");
});

const port = 3000;

app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch {
    (error) => {
      console.log(error);
    };
  }
};

start();
