const express = require("express");
const app = express();

const productData = require("./data");
app.get("/", (req, res) => {
  res.status(200).json({ productData });
});
app.listen(5000, () => {
  console.log("listening on port 5000");
});
