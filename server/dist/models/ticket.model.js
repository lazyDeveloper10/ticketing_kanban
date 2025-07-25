"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseTicketSelectedValue = exports.ticketSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require("./");
// noinspection Duplicates
const ticketSchema = () => {
    return joi_1.default
        .object({
        // ticketNumber: joi
        // 	.string()
        // 	.max(100)
        // 	.required(),
        ticketType: joi_1.default
            .string()
            .required(),
        ticketTitle: joi_1.default
            .string()
            .max(100)
            .required(),
        ticketDescription: joi_1.default
            .string()
            .required(),
        // position: joi
        // 	.number()
        // 	.precision(0)
        // 	.required(),
        file1: joi_1.default
            .string()
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
        file2: joi_1.default
            .string()
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
        file3: joi_1.default
            .string()
            .empty('')
            .allow('')
            .allow(null)
            .default(null),
        activeFlag: joi_1.default
            .boolean()
            .default(true),
        ticketProgressId: joi_1.default
            .string()
            .required(),
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
exports.ticketSchema = ticketSchema;
exports.baseTicketSelectedValue = {
    dropdown: () => {
        return {
            id: true,
            ticketType: true,
            ticketNumber: true,
            ticketTitle: true,
            position: true,
        };
    },
    base: (includeTimeStamps = false) => {
        return {
            id: true,
            ticketType: true,
            ticketNumber: true,
            ticketTitle: true,
            ticketDescription: true,
            position: true,
            file1: true,
            file2: true,
            file3: true,
            activeFlag: true,
            ticketProgress: {
                select: {
                    ..._1.baseTicketProgressSelectedValue.dropdown()
                }
            },
            ticketProgressId: true,
            ...(includeTimeStamps && _1.baseSelectedValue.timeStamps())
        };
    }
};
