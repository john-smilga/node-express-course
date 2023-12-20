const express = require("express");
const app = express();
const people = require("./routes/people");
const login = require("./routes/auth");
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use("/api/people", people);
app.use("/login", login);

app.use(express.json());

app.listen(5000, () => {
  console.log("listening on port 5000");
});
