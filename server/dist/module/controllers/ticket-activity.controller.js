"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneTicketActivity = exports.updateOneTicketActivity = exports.createOneTicketActivity = exports.findByIdTicketActivity = exports.findAllTicketActivity = void 0;
const api_1 = require("../../api");
const models_1 = require("../../models");
const config_1 = require("../../config");
const helpers_1 = require("../../helpers");
const findAllTicketActivity = async (req, res) => {
    try {
        const ticketActivityData = await (0, api_1.findAllTicketActivityApi)(req.params.ticketId);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketActivityData,
            title: null,
            message: null
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findAllTicketActivity = findAllTicketActivity;
const findByIdTicketActivity = async (req, res) => {
    try {
        const ticketActivityData = await (0, api_1.findByIdTicketActivityApi)(req.params.id);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketActivityData,
            title: null,
            message: null
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findByIdTicketActivity = findByIdTicketActivity;
const createOneTicketActivity = async (req, res) => {
    try {
        const validated = await (0, models_1.ticketActivitySchema)().validateAsync(req.body);
        validated.activityNumber = (0, helpers_1.generateRandomString)(5);
        const ticketActivityData = await (0, api_1.createOneTicketActivityApi)(validated);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.CREATED, {
            value: ticketActivityData,
            title: 'Ticket Activity',
            message: 'Successfully create ticket activity'
        });
    }
    catch (err) {
        console.log(err);
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.createOneTicketActivity = createOneTicketActivity;
const updateOneTicketActivity = async (req, res) => {
    try {
        const validated = await (0, models_1.ticketActivitySchema)().validateAsync(req.body);
        const ticketActivityData = await (0, api_1.updateOneTicketActivityApi)(req.params.id, validated);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketActivityData,
            title: 'Ticket Activity',
            message: 'Successfully update ticket activity'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.updateOneTicketActivity = updateOneTicketActivity;
const deleteOneTicketActivity = async (req, res) => {
    try {
        const ticketActivityData = await (0, api_1.deleteOneTicketActivityApi)(req.params.id);
        return (0, config_1.responseHandler)(res, config_1.responseStatus.OK, {
            value: ticketActivityData,
            title: 'Ticket Activity',
            message: 'Successfully delete ticket activity'
        });
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.deleteOneTicketActivity = deleteOneTicketActivity;
