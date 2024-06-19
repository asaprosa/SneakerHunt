const { StatusCodes } = require("http-status-codes");
const BaseError = require("../errors/base.error");

function errorHandler(err, req, res, next) {
    if(err instanceof BaseError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.details,
            data: {}
        });
    } 
    else {
        logger.error(`Something went wrong!`);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong!',
            error: err,
            data: {}
        });
    }
}

module.exports = errorHandler;