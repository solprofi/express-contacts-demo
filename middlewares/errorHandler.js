const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {    
    const statusCode = res.statusCode || 500;

    const errorObject = {
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
    }

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            return res.status(statusCode).json({
                ...errorObject,
                title: "Validation Failed",
            });
        case constants.UNAUTHORIZED:
            return res.status(statusCode).json({
                ...errorObject,
                title: "Unauthorized",
            });
        case constants.NOT_FOUND:
            return res.status(statusCode).json({
                ...errorObject,
                title: "Not Found",
            });
        case constants.FORBIDDEN:
            return res.status(statusCode).json({
                ...errorObject,
                title: "Forbidden",
            });
        case constants.SERVER_ERROR:
            return res.status(statusCode).json({
                ...errorObject,
                title: "Server Error",
            });
        default:
            return res.status(statusCode).json({
                ...errorObject,
                title: "Server Error",
            });
    }
}

module.exports = errorHandler;            