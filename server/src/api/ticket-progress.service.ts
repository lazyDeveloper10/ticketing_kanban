import { PrismaClient } from '@prisma/client';
import { Mutex } from 'async-mutex';

import {
	createOne,
	deleteOne,
	findById, findCount,
	findDropdown,
	updateOne
} from '../api';
import { baseTicketProgressSelectedValue } from '../models';

const mutex = new Mutex();

// CRUD API   ==================================================================================

export const findAllTicketProgressApi = async () => {
	const ticketProgressData = await findDropdown(
		{
			model: 'ticketProgress',
			selectedFields: baseTicketProgressSelectedValue.baseDetail(true),
			orderBy: [
				{
					position: 'asc'
				}
			]
		}
	);

	ticketProgressData.map((item: any) => {
		delete Object.assign(item, { ['ticket']: item['ticketProgressTicketTicketProgress'] })['ticketProgressTicketTicketProgress'];

		return item;
	});

	return ticketProgressData;
};

export const findByIdTicketProgressApi = async (id: string) => {
	return await findById(
		{
			model: 'ticketProgress',
			condition: {
				id: id
			},
			selectedFields: baseTicketProgressSelectedValue.base(),
		}
	);
};

export const findDropdownTicketProgressApi = async () => {
	return await findDropdown(
		{
			model: 'ticketProgress',
			selectedFields: baseTicketProgressSelectedValue.base(),
			orderBy: [
				{
					position: 'asc'
				}
			]
		}
	);
};

export const createOneTicketProgressApi = async (body: any) => {
	const release = await mutex.acquire();
	const prismaClient = new PrismaClient();

	try {
		return await prismaClient.$transaction(async (client: any) => {
			const lastPositionData = await countTicketProgressApi();

			body.position = lastPositionData + 1;

			return await createOne(
				{
					model: 'ticketProgress',
					selectedFields: baseTicketProgressSelectedValue.base(),
				},
				body
			);

		}, {
			maxWait: 150000, // default: 2000
			timeout: 150000, // default: 5000
		});

	} catch (err) {
		throw new Error('Error: Failed to create ticket progress');

	} finally {
		await prismaClient.$disconnect();
		release();
	}
};

export const updateOneTicketProgressApi = async (id: string, body: any, client?: any) => {
	return await updateOne(
		{
			model: 'ticketProgress',
			condition: {
				id: id
			},
			selectedFields: baseTicketProgressSelectedValue.base(),
		},
		body,
		client
	);
};

export const deleteOneTicketProgressApi = async (id: string) => {
	return await deleteOne(
		{
			model: 'ticketProgress',
			condition: {
				id: id
			},
			selectedFields: baseTicketProgressSelectedValue.base(),
		}
	);
};

// OTHER API  ==================================================================================

export const countTicketProgressApi = async () => {
	return await findCount(
		{
			model: 'ticketProgress',
		}
	);
};

export const updateManyTicketProgressPositionApi = async (body: any[]) => {
	const release = await mutex.acquire();
	const prismaClient = new PrismaClient();

	try {
		return await prismaClient.$transaction(async (client: any) => {
			for await (const item of body) {
				let copyValue = Object.assign({}, item);

				delete copyValue.id;
				delete copyValue.ticket;
				delete copyValue.updatedBy;
				delete copyValue.updatedAt;

				await updateOneTicketProgressApi(item.id, copyValue, client);
			}

			return {};

		}, {
			maxWait: 150000, // default: 2000
			timeout: 150000, // default: 5000
		});

	} catch (err) {
		throw new Error('Error: Failed to update ticket progress position');

	} finally {
		await prismaClient.$disconnect();
		release();
	}
};
