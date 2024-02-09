const express = require("express");
const router = express.Router();

const app = express();
app.use(express.urlencoded({ extended: false }));

router.post("/", (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  } else {
    return res.status(401).send("Please Provide Your name first ok ");
  }
});

module.exports = router;
