const { badRequestError } = require("../errors/index");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new badRequestError("please provide the login credentials");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  console.log(req.user);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here's your lucky number ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
