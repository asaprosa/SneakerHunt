const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class NotFoundError extends BaseError {
    constructor(resourceName, resourceValue) {
        super(`NotFoundError`, StatusCodes.NOT_FOUND, `The requested ${resourceName} is not found for ID ${resourceValue}`, {
            resourceName,
            resourceValue
        });
    }
}

module.exports = NotFoundError;