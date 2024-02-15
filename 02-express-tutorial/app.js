const express = require("express");
const app = express();

app.get("/", (req, res) => {
	const method = req.method;

	res.send("Home");
});

app.get("/abput", (req, res) => {
	res.send("About");
});

app.listen(5000, () => {
	console.log("server is listening to port");
});
