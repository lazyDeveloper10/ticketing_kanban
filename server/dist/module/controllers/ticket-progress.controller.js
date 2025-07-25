"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManyTicketProgressPosition = exports.deleteOneTicketProgress = exports.updateOneTicketProgress = exports.createOneTicketProgress = exports.findDropdownTicketProgress = exports.findByIdTicketProgress = exports.findAllTicketProgress = void 0;
const api_1 = require("../../api");
const models_1 = require("../../models");
const config_1 = require("../../config");
const findAllTicketProgress = async (req, res) => {
    try {
        const ticketProgressData = await (0, api_1.findAllTicketProgressApi)();
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketProgressData,
            title: null,
            message: null
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findAllTicketProgress = findAllTicketProgress;
const findByIdTicketProgress = async (req, res) => {
    try {
        const ticketProgressData = await (0, api_1.findByIdTicketProgressApi)(req.params.id);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketProgressData,
            title: null,
            message: null
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findByIdTicketProgress = findByIdTicketProgress;
const findDropdownTicketProgress = async (req, res) => {
    try {
        const ticketProgressData = await (0, api_1.findDropdownTicketProgressApi)();
        return res.status(200).json(ticketProgressData);
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findDropdownTicketProgress = findDropdownTicketProgress;
const createOneTicketProgress = async (req, res) => {
    try {
        const validated = await (0, models_1.ticketProgressSchema)().validateAsync(req.body);
        // validated.createdByUserId = req.user.id;
        // validated.updatedByUserId = req.user.id;
        const ticketProgressData = await (0, api_1.createOneTicketProgressApi)(validated);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.CREATED, {
            value: ticketProgressData,
            title: 'Ticket Progress',
            message: 'Successfully create ticket progress'
        });
    }
    catch (err) {
        console.log(err);
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.createOneTicketProgress = createOneTicketProgress;
const updateOneTicketProgress = async (req, res) => {
    try {
        const validated = await (0, models_1.ticketProgressSchema)().validateAsync(req.body);
        // validated.updatedByUserId = req.user.id;
        const ticketProgressData = await (0, api_1.updateOneTicketProgressApi)(req.params.id, validated);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketProgressData,
            title: 'Ticket Progress',
            message: 'Successfully update ticket progress'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.updateOneTicketProgress = updateOneTicketProgress;
const deleteOneTicketProgress = async (req, res) => {
    try {
        const ticketProgressData = await (0, api_1.deleteOneTicketProgressApi)(req.params.id);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketProgressData,
            title: 'Ticket Progress',
            message: 'Successfully delete ticket progress'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.deleteOneTicketProgress = deleteOneTicketProgress;
// OTHER API  ==================================================================================
const updateManyTicketProgressPosition = async (req, res) => {
    try {
        const ticketProgressData = await (0, api_1.updateManyTicketProgressPositionApi)(req.body);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketProgressData,
            title: 'Ticket Progress',
            message: 'Successfully update position ticket progress'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.updateManyTicketProgressPosition = updateManyTicketProgressPosition;
