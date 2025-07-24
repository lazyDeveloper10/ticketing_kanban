import { PrismaClient } from '@prisma/client';
import { Mutex } from 'async-mutex';

import {
	createOne,
	deleteOne,
	findById, findCount,
	findDropdown,
	updateOne
} from '../api';
import { baseTicketSelectedValue } from '../models';
import { padWithLeadingZeros, ticketCode } from '../helpers';

const mutex = new Mutex();

// CRUD API   ==================================================================================

export const findAllTicketApi = async (ticketProgressId: string) => {
	return await findDropdown(
		{
			model: 'ticket',
			condition: {
				ticketProgressId: ticketProgressId,
			},
			selectedFields: baseTicketSelectedValue.base(),
			orderBy: [
				{
					position: 'asc'
				}
			]
		}
	);
};

export const findByIdTicketApi = async (id: string) => {
	const ticketData = await findById(
		{
			model: 'ticket',
			condition: {
				id: id
			},
			selectedFields: baseTicketSelectedValue.base(true),
		}
	);

	let copyValue = Object.assign({}, ticketData);

	copyValue.createdBy = JSON.parse(ticketData.createdBy);

	return copyValue;
};

export const createOneTicketApi = async (body: any) => {
	const release = await mutex.acquire();
	const prismaClient = new PrismaClient();

	try {
		return await prismaClient.$transaction(async (client: any) => {
			const lastPositionData = await countTicketApi();

			body.position = lastPositionData + 1;
			body.ticketNumber = `${ ticketCode(body.ticketType) }_` + padWithLeadingZeros(body.position, 5);

			return await createOne(
				{
					model: 'ticket',
					selectedFields: baseTicketSelectedValue.base(),
				},
				body
			);

		}, {
			maxWait: 150000, // default: 2000
			timeout: 150000, // default: 5000
		});

	} catch (err) {
		throw new Error('Error: Failed to create ticket');

	} finally {
		await prismaClient.$disconnect();
		release();
	}
};

export const updateOneTicketApi = async (id: string, body: any, client?: any) => {
	return await updateOne(
		{
			model: 'ticket',
			condition: {
				id: id
			},
			selectedFields: baseTicketSelectedValue.base(),
		},
		body,
		client
	);
};

export const deleteOneTicketApi = async (id: string) => {
	return await deleteOne(
		{
			model: 'ticket',
			condition: {
				id: id
			},
			selectedFields: baseTicketSelectedValue.base(),
		}
	);
};

// OTHER API  ==================================================================================

export const countTicketApi = async () => {
	return await findCount(
		{
			model: 'ticket',
		}
	);
};

export const updateManyTicketPositionApi = async (body: any[]) => {
	const release = await mutex.acquire();
	const prismaClient = new PrismaClient();

	try {
		return await prismaClient.$transaction(async (client: any) => {
			for await (const item of body) {
				let copyValue = Object.assign({}, item);

				delete copyValue.id;
				delete copyValue.ticketProgress;
				delete copyValue.updatedBy;
				delete copyValue.updatedAt;

				await updateOneTicketApi(item.id, copyValue, client);
			}

			return {};

		}, {
			maxWait: 150000, // default: 2000
			timeout: 150000, // default: 5000
		});

	} catch (err) {
		throw new Error('Error: Failed to update ticket position');

	} finally {
		await prismaClient.$disconnect();
		release();
	}
};
