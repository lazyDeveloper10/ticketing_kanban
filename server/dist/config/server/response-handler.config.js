"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorTransactionHandler = exports.errorHandler = exports.responsePaginationHandler = exports.responseHandler = void 0;
const response_status_config_1 = require("./response-status.config");
const helpers_1 = require("../../helpers");
const responseHandler = (res, status, data) => {
    return res.status(status).json({
        ...(data.value && { value: data.value }),
        ...(data.title && { title: data.title }),
        ...(data.message && { message: data.message }),
    });
};
exports.responseHandler = responseHandler;
const responsePaginationHandler = (res, status, data) => {
    return res.status(status).json({
        ...(data.value && { value: data.value }),
        total: data.total,
        pages: data.total / data.size === 0 ? 1 : Math.ceil(data.total / data.size),
        ...(data.page && { page: data.page }),
        ...(data.size && { size: data.size }),
        ...(data.sort && { sortBy: data.sort })
    });
};
exports.responsePaginationHandler = responsePaginationHandler;
const errorHandler = async (res, err) => {
    let resStatus = response_status_config_1.responseStatus.INTERNAL_SERVER_ERROR;
    let bodyError = {
        value: null,
        title: 'Internal Server Error',
        message: 'Error: Internal server error'
    };
    const defaultMessage = `${res.req.method} | ${res.req.headers.origin} | ${res.req.headers['user-agent']}`;
    if (err?.hasOwnProperty('details')) {
        console.log(err, 'ini di has own property details');
    }
    if (err?.message === 'Error: Internal server error') {
        resStatus = response_status_config_1.responseStatus.INTERNAL_SERVER_ERROR;
        bodyError.title = 'Internal Server Error';
        bodyError.message = err.message;
        helpers_1.logger.error(`${defaultMessage} | ` + err.message);
    }
    if (err?.message.slice(0, 6) === 'Error:') {
        resStatus = response_status_config_1.responseStatus.BAD_REQUEST;
        bodyError.title = 'Request Error';
        bodyError.message = err.message;
        helpers_1.logger.error(`${defaultMessage} | ` + err.message);
    }
    if (err?.message.slice(0, 13) === 'Unauthorized:') {
        resStatus = response_status_config_1.responseStatus.UNAUTHORIZED;
        bodyError.title = 'Unauthorized';
        bodyError.message = err.message;
        helpers_1.logger.error(`${defaultMessage} | ` + err.message);
    }
    if (err?.message.slice(0, 10) === 'Forbidden:') {
        resStatus = response_status_config_1.responseStatus.FORBIDDEN;
        bodyError.title = 'Forbidden';
        bodyError.message = err.message;
        helpers_1.logger.error(`${defaultMessage} | ` + err.message);
    }
    return (0, exports.responseHandler)(res, resStatus, bodyError);
};
exports.errorHandler = errorHandler;
const errorTransactionHandler = (err, defaultMessage) => {
    if (err?.message.slice(0, 6) === 'Error:') {
        throw new Error(err.message);
    }
    else {
        throw new Error(defaultMessage);
    }
};
exports.errorTransactionHandler = errorTransactionHandler;
