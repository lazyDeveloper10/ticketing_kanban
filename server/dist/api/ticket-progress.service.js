"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManyTicketProgressPositionApi = exports.countTicketProgressApi = exports.deleteOneTicketProgressApi = exports.updateOneTicketProgressApi = exports.createOneTicketProgressApi = exports.findDropdownTicketProgressApi = exports.findByIdTicketProgressApi = exports.findAllTicketProgressApi = void 0;
const client_1 = require("@prisma/client");
const async_mutex_1 = require("async-mutex");
const api_1 = require("../api");
const models_1 = require("../models");
const mutex = new async_mutex_1.Mutex();
// CRUD API   ==================================================================================
const findAllTicketProgressApi = async () => {
    const ticketProgressData = await (0, api_1.findDropdown)({
        model: 'ticketProgress',
        selectedFields: models_1.baseTicketProgressSelectedValue.baseDetail(true),
        orderBy: [
            {
                position: 'asc'
            }
        ]
    });
    ticketProgressData.map((item) => {
        delete Object.assign(item, { ['ticket']: item['ticketProgressTicketTicketProgress'] })['ticketProgressTicketTicketProgress'];
        return item;
    });
    return ticketProgressData;
};
exports.findAllTicketProgressApi = findAllTicketProgressApi;
const findByIdTicketProgressApi = async (id) => {
    return await (0, api_1.findById)({
        model: 'ticketProgress',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketProgressSelectedValue.base(),
    });
};
exports.findByIdTicketProgressApi = findByIdTicketProgressApi;
const findDropdownTicketProgressApi = async () => {
    return await (0, api_1.findDropdown)({
        model: 'ticketProgress',
        selectedFields: models_1.baseTicketProgressSelectedValue.base(),
        orderBy: [
            {
                position: 'asc'
            }
        ]
    });
};
exports.findDropdownTicketProgressApi = findDropdownTicketProgressApi;
const createOneTicketProgressApi = async (body) => {
    const release = await mutex.acquire();
    const prismaClient = new client_1.PrismaClient();
    try {
        return await prismaClient.$transaction(async (client) => {
            const lastPositionData = await (0, exports.countTicketProgressApi)();
            body.position = lastPositionData + 1;
            return await (0, api_1.createOne)({
                model: 'ticketProgress',
                selectedFields: models_1.baseTicketProgressSelectedValue.base(),
            }, body);
        }, {
            maxWait: 150000, // default: 2000
            timeout: 150000, // default: 5000
        });
    }
    catch (err) {
        throw new Error('Error: Failed to create ticket progress');
    }
    finally {
        await prismaClient.$disconnect();
        release();
    }
};
exports.createOneTicketProgressApi = createOneTicketProgressApi;
const updateOneTicketProgressApi = async (id, body, client) => {
    return await (0, api_1.updateOne)({
        model: 'ticketProgress',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketProgressSelectedValue.base(),
    }, body, client);
};
exports.updateOneTicketProgressApi = updateOneTicketProgressApi;
const deleteOneTicketProgressApi = async (id) => {
    return await (0, api_1.deleteOne)({
        model: 'ticketProgress',
        condition: {
            id: id
        },
        selectedFields: models_1.baseTicketProgressSelectedValue.base(),
    });
};
exports.deleteOneTicketProgressApi = deleteOneTicketProgressApi;
// OTHER API  ==================================================================================
const countTicketProgressApi = async () => {
    return await (0, api_1.findCount)({
        model: 'ticketProgress',
    });
};
exports.countTicketProgressApi = countTicketProgressApi;
const updateManyTicketProgressPositionApi = async (body) => {
    const release = await mutex.acquire();
    const prismaClient = new client_1.PrismaClient();
    try {
        return await prismaClient.$transaction(async (client) => {
            for await (const item of body) {
                let copyValue = Object.assign({}, item);
                delete copyValue.id;
                delete copyValue.ticket;
                delete copyValue.updatedBy;
                delete copyValue.updatedAt;
                await (0, exports.updateOneTicketProgressApi)(item.id, copyValue, client);
            }
            return {};
        }, {
            maxWait: 150000, // default: 2000
            timeout: 150000, // default: 5000
        });
    }
    catch (err) {
        throw new Error('Error: Failed to update ticket progress position');
    }
    finally {
        await prismaClient.$disconnect();
        release();
    }
};
exports.updateManyTicketProgressPositionApi = updateManyTicketProgressPositionApi;
