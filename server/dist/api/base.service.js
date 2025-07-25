"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertOne = exports.deleteOne = exports.updateOne = exports.createMany = exports.createOne = exports.findCount = exports.findDropdownSearch = exports.findDropdown = exports.findById = exports.findAll = void 0;
const config_1 = require("../config");
const findAll = async (query) => {
    return config_1.prisma.$transaction([
        // @ts-ignore
        config_1.prisma[query.model].findMany({
            where: query.condition,
            select: query.selectedFields,
            skip: (query.pagination.page - 1) * query.pagination.size,
            take: query.pagination.size,
            orderBy: [query.pagination?.sort]
        }),
        // @ts-ignore
        config_1.prisma[query.model].count({ where: query.condition })
    ]);
};
exports.findAll = findAll;
const findById = async (query, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].findFirst({
        where: query.condition,
        select: query.selectedFields,
        orderBy: query.orderBy
    });
};
exports.findById = findById;
const findDropdown = async (query, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].findMany({
        where: query.condition,
        select: query.selectedFields,
        ...(query.size && { take: query.size }),
        ...(query.orderBy && { orderBy: query.orderBy })
    });
};
exports.findDropdown = findDropdown;
const findDropdownSearch = async (query, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].findMany({
        where: query.condition,
        select: query.selectedFields,
        ...(query.size && { take: query.size }),
        ...(query.orderBy && { orderBy: query.orderBy })
    });
};
exports.findDropdownSearch = findDropdownSearch;
const findCount = async (query, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].count({
        where: query.condition
    });
};
exports.findCount = findCount;
const createOne = async (query, body, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].create({
        data: body,
        select: query.selectedFields
    });
};
exports.createOne = createOne;
const createMany = async (query, body, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].createMany({ data: body });
};
exports.createMany = createMany;
const updateOne = async (query, body, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].update({
        where: query.condition,
        data: body,
        select: query.selectedFields
    });
};
exports.updateOne = updateOne;
const deleteOne = async (query, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].delete({
        where: query.condition,
        select: query.selectedFields
    });
};
exports.deleteOne = deleteOne;
const upsertOne = async (query, bodyUpdate, bodyCreate, client) => {
    let prismaClient = client ? client : config_1.prisma;
    return prismaClient[query.model].upsert({
        where: query.condition,
        update: bodyUpdate,
        create: bodyCreate
    });
};
exports.upsertOne = upsertOne;
