"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManyTicketPositionApi = exports.countTicketApi = exports.deleteOneTicketApi = exports.updateOneTicketApi = exports.createOneTicketApi = exports.findByIdTicketApi = exports.findAllTicketApi = void 0;
const client_1 = require("@prisma/client");
const async_mutex_1 = require("async-mutex");
const api_1 = require("../api");
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const mutex = new async_mutex_1.Mutex();
// CRUD API   ==================================================================================
const findAllTicketApi = async (ticketProgressId) => {
    return await (0, api_1.findDropdown)({
        model: 'ticket',
        condition: {
            ticketProgressId: ticketProgressId,
        },
        selectedFields: models_1.baseTicketSelectedValue.base(),
        orderBy: [
            {
                position: 'asc'
            }
        ]
    });
};
exports.findAllTicketApi = findAllTicketApi;
const findByIdTicketApi = async (id) => {
    const ticketData = await (0, api_1.findById)({
        model: 'ticket',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketSelectedValue.base(true),
    });
    let copyValue = Object.assign({}, ticketData);
    copyValue.createdBy = JSON.parse(ticketData.createdBy);
    return copyValue;
};
exports.findByIdTicketApi = findByIdTicketApi;
const createOneTicketApi = async (body) => {
    const release = await mutex.acquire();
    const prismaClient = new client_1.PrismaClient();
    try {
        return await prismaClient.$transaction(async (client) => {
            const lastPositionData = await (0, exports.countTicketApi)();
            body.position = lastPositionData + 1;
            body.ticketNumber = `${(0, helpers_1.ticketCode)(body.ticketType)}_` + (0, helpers_1.padWithLeadingZeros)(body.position, 5);
            return await (0, api_1.createOne)({
                model: 'ticket',
                selectedFields: models_1.baseTicketSelectedValue.base(),
            }, body);
        }, {
            maxWait: 150000, // default: 2000
            timeout: 150000, // default: 5000
        });
    }
    catch (err) {
        throw new Error('Error: Failed to create ticket');
    }
    finally {
        await prismaClient.$disconnect();
        release();
    }
};
exports.createOneTicketApi = createOneTicketApi;
const updateOneTicketApi = async (id, body, client) => {
    return await (0, api_1.updateOne)({
        model: 'ticket',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketSelectedValue.base(),
    }, body, client);
};
exports.updateOneTicketApi = updateOneTicketApi;
const deleteOneTicketApi = async (id) => {
    return await (0, api_1.deleteOne)({
        model: 'ticket',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketSelectedValue.base(),
    });
};
exports.deleteOneTicketApi = deleteOneTicketApi;
// OTHER API  ==================================================================================
const countTicketApi = async () => {
    return await (0, api_1.findCount)({
        model: 'ticket',
    });
};
exports.countTicketApi = countTicketApi;
const updateManyTicketPositionApi = async (body) => {
    const release = await mutex.acquire();
    const prismaClient = new client_1.PrismaClient();
    try {
        return await prismaClient.$transaction(async (client) => {
            for await (const item of body) {
                let copyValue = Object.assign({}, item);
                delete copyValue.id;
                delete copyValue.ticketProgress;
                delete copyValue.updatedBy;
                delete copyValue.updatedAt;
                await (0, exports.updateOneTicketApi)(item.id, copyValue, client);
            }
            return {};
        }, {
            maxWait: 150000, // default: 2000
            timeout: 150000, // default: 5000
        });
    }
    catch (err) {
        throw new Error('Error: Failed to update ticket position');
    }
    finally {
        await prismaClient.$disconnect();
        release();
    }
};
exports.updateManyTicketPositionApi = updateManyTicketPositionApi;
