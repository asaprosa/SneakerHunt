const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class ConflictError extends BaseError {
  constructor(key, propertyName, propertyValue, details) {
    super(
      "Conflict Error",
      StatusCodes.CONFLICT,
      `${key} with ${propertyName} '${propertyValue}' already exists!`,
      details
    );
  }
}

module.exports = ConflictError;