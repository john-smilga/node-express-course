const express = require("express");
const app = express();

let { people } = require("./data");

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.use(express.json());

app.post("/login", (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  } else {
    return res.status(401).send("Please Provide Your name first ok ");
  }
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(401).json("Please provide the name").json({ error: true });
  }
  res.status(200).json({ success: true, person: name });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
