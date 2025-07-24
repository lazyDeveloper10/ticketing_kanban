import { prisma } from '../config';

import { BasePrismaServiceInterface } from '../models';

export const findAll = async (query: BasePrismaServiceInterface) => {
	return prisma.$transaction(
		[
			// @ts-ignore
			prisma[query.model].findMany(
				{
					where: query.condition,

					select: query.selectedFields,

					skip: (query.pagination!.page - 1) * query.pagination!.size,
					take: query.pagination!.size,

					orderBy: [ query.pagination?.sort ]
				}
			),

			// @ts-ignore
			prisma[query.model].count({ where: query.condition })
		]
	);
};

export const findById = async (query: BasePrismaServiceInterface, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].findFirst(
		{
			where: query.condition,

			select: query.selectedFields,

			orderBy: query.orderBy
		}
	);
};

export const findDropdown = async (query: BasePrismaServiceInterface, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].findMany(
		{
			where: query.condition,

			select: query.selectedFields,

			...(query.size && { take: query.size }),

			...(query.orderBy && { orderBy: query.orderBy })
		}
	);
};

export const findDropdownSearch = async (query: BasePrismaServiceInterface, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].findMany(
		{
			where: query.condition,

			select: query.selectedFields,

			...(query.size && { take: query.size }),

			...(query.orderBy && { orderBy: query.orderBy })
		}
	);
};

export const findCount = async (query: BasePrismaServiceInterface, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].count(
		{
			where: query.condition
		}
	);
};

export const createOne = async (query: BasePrismaServiceInterface, body: any, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].create(
		{
			data: body,

			select: query.selectedFields
		}
	);
};

export const createMany = async (query: BasePrismaServiceInterface, body: any, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].createMany({ data: body });
};

export const updateOne = async (query: BasePrismaServiceInterface, body: any, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].update(
		{
			where: query.condition,

			data: body,

			select: query.selectedFields
		}
	);
};

export const deleteOne = async (query: BasePrismaServiceInterface, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].delete(
		{
			where: query.condition,

			select: query.selectedFields
		}
	);
};

export const upsertOne = async (query: BasePrismaServiceInterface, bodyUpdate: any, bodyCreate: any, client?: any) => {
	let prismaClient = client ? client : prisma;

	return prismaClient[query.model].upsert(
		{
			where: query.condition,

			update: bodyUpdate,

			create: bodyCreate
		}
	);
};


















































