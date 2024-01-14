const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { login, dashboard } = require("../controllers/main");

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
