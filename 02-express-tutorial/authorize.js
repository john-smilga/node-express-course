const authorize = (req, res, next) => {
	const { user } = req.query;
	if (user === "vini") {
		// adding a property of user to req object
		req.user = { name: "vini", id: "4" };
		next();
	} else {
		res.status(401).send("Unauthorised");
	}

	next();
};
module.exports = authorize;
