const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    const errorObject = {
        message: err.message,
        stackTrace: err.stack
    }

    switch (statusCode) {
        case constants.VALIDATION_ERROR: {
            res.json({
                ...errorObject,
                title: "Validation Failed",
            });
            break;
        }
        case constants.UNAUTHORIZED: {
            res.json({
                ...errorObject,
                title: "Unauthorized",
            });
            break;
        }
        case constants.NOT_FOUND: {
            res.json({
                ...errorObject,
                title: "Not Found",
            });
            break;
        }
        case constants.FORBIDDEN: {
            res.json({
                ...errorObject,
                title: "Forbidden",
            });
            break;
        }
        case constants.SERVER_ERROR: {
            res.json({
                ...errorObject,
                title: "Server Error",
            });
            break;
        }
        default:
            console.log("No error, All good!");
            break;
    }
}

module.exports = errorHandler;            