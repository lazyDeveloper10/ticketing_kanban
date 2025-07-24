import { Request, Response } from 'express';

import {
	createOneTicketActivityApi,
	deleteOneTicketActivityApi,
	findAllTicketActivityApi,
	findByIdTicketActivityApi,
	updateOneTicketActivityApi
} from '../../api';
import { ticketActivitySchema } from '../../models';
import { errorHandler, responseHandler, responseStatus } from '../../config';
import { generateRandomString } from '../../helpers';

export const findAllTicketActivity: any = async (req: Request, res: Response) => {
	try {
		const ticketActivityData = await findAllTicketActivityApi(req.params.ticketId);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketActivityData,
				title: null,
				message: null
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const findByIdTicketActivity: any = async (req: Request, res: Response) => {
	try {
		const ticketActivityData = await findByIdTicketActivityApi(req.params.id);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketActivityData,
				title: null,
				message: null
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const createOneTicketActivity: any = async (req: Request, res: Response) => {
	try {
		const validated = await ticketActivitySchema().validateAsync(req.body);

		validated.activityNumber = generateRandomString(5)

		const ticketActivityData = await createOneTicketActivityApi(validated);

		return responseHandler(
			res,
			responseStatus.CREATED,
			{
				value: ticketActivityData,
				title: 'Ticket Activity',
				message: 'Successfully create ticket activity'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const updateOneTicketActivity: any = async (req: Request, res: Response) => {
	try {
		const validated = await ticketActivitySchema().validateAsync(req.body);

		const ticketActivityData = await updateOneTicketActivityApi(req.params.id, validated);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketActivityData,
				title: 'Ticket Activity',
				message: 'Successfully update ticket activity'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const deleteOneTicketActivity: any = async (req: Request, res: Response) => {
	try {
		const ticketActivityData = await deleteOneTicketActivityApi(req.params.id);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketActivityData,
				title: 'Ticket Activity',
				message: 'Successfully delete ticket activity'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};
