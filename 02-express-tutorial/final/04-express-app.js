const express = require("express");

// to get absolute path of the file
const path = require("path");

const app = express();

// setup static and middleware
/*
app.use() is used to set up middleware. express.static is a built in middleware.
static assets are files that server doen't have to change , example  image files,CSS files
*/
app.use(express.static("./public"));

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
	res.status(404).send("resource not found");
});

app.listen(5000, () => {
	console.log("server is listening on port 5000....");
});
