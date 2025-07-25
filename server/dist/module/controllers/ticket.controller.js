"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManyTicketPosition = exports.deleteOneTicket = exports.updateOneTicket = exports.createOneTicket = exports.findByIdTicket = exports.findAllTicket = void 0;
const api_1 = require("../../api");
const models_1 = require("../../models");
const config_1 = require("../../config");
const findAllTicket = async (req, res) => {
    try {
        const ticketData = await (0, api_1.findAllTicketApi)(req.params.ticketProgressId);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketData,
            title: null,
            message: null
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findAllTicket = findAllTicket;
const findByIdTicket = async (req, res) => {
    try {
        const ticketData = await (0, api_1.findByIdTicketApi)(req.params.id);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketData,
            title: null,
            message: null
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findByIdTicket = findByIdTicket;
const createOneTicket = async (req, res) => {
    try {
        const validated = await (0, models_1.ticketSchema)().validateAsync(req.body);
        // validated.createdByUserId = req.user.id;
        // validated.updatedByUserId = req.user.id;
        const ticketData = await (0, api_1.createOneTicketApi)(validated);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.CREATED, {
            value: ticketData,
            title: 'Ticket',
            message: 'Successfully create ticket'
        });
    }
    catch (err) {
        console.log(err);
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.createOneTicket = createOneTicket;
const updateOneTicket = async (req, res) => {
    try {
        const validated = await (0, models_1.ticketSchema)().validateAsync(req.body);
        // validated.updatedByUserId = req.user.id;
        const ticketData = await (0, api_1.updateOneTicketApi)(req.params.id, validated);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketData,
            title: 'Ticket',
            message: 'Successfully update ticket'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.updateOneTicket = updateOneTicket;
const deleteOneTicket = async (req, res) => {
    try {
        const ticketData = await (0, api_1.deleteOneTicketApi)(req.params.id);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketData,
            title: 'Ticket',
            message: 'Successfully delete ticket'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.deleteOneTicket = deleteOneTicket;
// OTHER API  ==================================================================================
const updateManyTicketPosition = async (req, res) => {
    try {
        const ticketData = await (0, api_1.updateManyTicketPositionApi)(req.body);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketData,
            title: 'Ticket',
            message: 'Successfully update position ticket'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.updateManyTicketPosition = updateManyTicketPosition;
