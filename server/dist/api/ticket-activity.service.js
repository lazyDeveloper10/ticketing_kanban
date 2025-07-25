"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneTicketActivityApi = exports.updateOneTicketActivityApi = exports.createOneTicketActivityApi = exports.findByIdTicketActivityApi = exports.findAllTicketActivityApi = void 0;
const api_1 = require("../api");
const models_1 = require("../models");
// CRUD API   ==================================================================================
const findAllTicketActivityApi = async (ticketId) => {
    const ticketActivityData = await (0, api_1.findDropdown)({
        model: 'ticketActivity',
        condition: {
            ticketId: ticketId
        },
        selectedFields: models_1.baseTicketActivitySelectedValue.base(true),
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    });
    if (ticketActivityData.length) {
        ticketActivityData.map((item) => {
            item.createdBy = JSON.parse(item.createdBy);
            return item;
        });
    }
    return ticketActivityData;
};
exports.findAllTicketActivityApi = findAllTicketActivityApi;
const findByIdTicketActivityApi = async (id) => {
    return await (0, api_1.findById)({
        model: 'ticketActivity',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketActivitySelectedValue.base(),
    });
};
exports.findByIdTicketActivityApi = findByIdTicketActivityApi;
const createOneTicketActivityApi = async (body) => {
    return await (0, api_1.createOne)({
        model: 'ticketActivity',
        selectedFields: models_1.baseTicketActivitySelectedValue.base(),
    }, body);
};
exports.createOneTicketActivityApi = createOneTicketActivityApi;
const updateOneTicketActivityApi = async (id, body) => {
    return await (0, api_1.updateOne)({
        model: 'ticketActivity',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketActivitySelectedValue.base(),
    }, body);
};
exports.updateOneTicketActivityApi = updateOneTicketActivityApi;
const deleteOneTicketActivityApi = async (id) => {
    return await (0, api_1.deleteOne)({
        model: 'ticketActivity',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketActivitySelectedValue.base(),
    });
};
exports.deleteOneTicketActivityApi = deleteOneTicketActivityApi;
