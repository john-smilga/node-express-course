const customApiError = require("./custom-error");

class UnauthenticatedError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthenticatedError;
