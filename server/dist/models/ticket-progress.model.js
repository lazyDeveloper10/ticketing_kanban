"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseTicketProgressSelectedValue = exports.ticketProgressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require("./");
// noinspection Duplicates
const ticketProgressSchema = () => {
    return joi_1.default
        .object({
        ticketProgressName: joi_1.default
            .string()
            .max(50)
            .required(),
        ticketProgressCode: joi_1.default
            .string()
            .max(50)
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
        // position: joi
        // 	.number()
        // 	.precision(0)
        // 	.required(),
        theme: joi_1.default
            .string()
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
        description: joi_1.default
            .string()
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
        createdBy: joi_1.default
            .string()
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
        updatedBy: joi_1.default
            .string()
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
    })
        .options({
        abortEarly: false,
        stripUnknown: true
    });
};
exports.ticketProgressSchema = ticketProgressSchema;
exports.baseTicketProgressSelectedValue = {
    dropdown: () => {
        return {
            id: true,
            ticketProgressName: true,
            position: true,
            theme: true,
        };
    },
    base: (includeTimeStamps = false) => {
        return {
            id: true,
            ticketProgressName: true,
            ticketProgressCode: true,
            position: true,
            theme: true,
            description: true,
            ...(includeTimeStamps && _1.baseSelectedValue.timeStamps())
        };
    },
    baseDetail: (includeTimeStamps = false) => {
        return {
            id: true,
            ticketProgressName: true,
            ticketProgressCode: true,
            position: true,
            theme: true,
            description: true,
            ticketProgressTicketTicketProgress: {
                select: {
                    ..._1.baseTicketSelectedValue.base(true)
                },
                orderBy: [
                    {
                        position: 'asc'
                    }
                ]
            },
            ...(includeTimeStamps && _1.baseSelectedValue.timeStamps())
        };
    },
};
