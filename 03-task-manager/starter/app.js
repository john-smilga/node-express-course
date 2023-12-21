const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

app.use(express.json());
app.use("/api/v1/tasks", tasks);

//routes

app.get("/", (req, res) => {
  res.send("task manager app");
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
