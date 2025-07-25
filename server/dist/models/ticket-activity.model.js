"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseTicketActivitySelectedValue = exports.ticketActivitySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const _1 = require("./");
// noinspection Duplicates
const ticketActivitySchema = () => {
    return joi_1.default
        .object({
        // activityId: joi
        // 	.string()
        // 	.max(100)
        // 	.required(),
        activity: joi_1.default
            .string()
            .required(),
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
        ticketId: joi_1.default
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
exports.ticketActivitySchema = ticketActivitySchema;
exports.baseTicketActivitySelectedValue = {
    base: (includeTimeStamps = false) => {
        return {
            id: true,
            activityNumber: true,
            activity: true,
            file1: true,
            file2: true,
            file3: true,
            ticket: {
                select: {
                    ..._1.baseTicketSelectedValue.dropdown()
                }
            },
            ticketId: true,
            ...(includeTimeStamps && _1.baseSelectedValue.timeStamps())
        };
    }
};
