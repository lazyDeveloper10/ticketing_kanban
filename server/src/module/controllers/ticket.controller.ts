import { Request, Response } from 'express';

import {
	createOneTicketApi,
	deleteOneTicketApi,
	findAllTicketApi,
	findByIdTicketApi,
	updateManyTicketPositionApi,
	updateOneTicketApi
} from '../../api';
import { ticketSchema } from '../../models';
import { errorHandler, responseHandler, responseStatus } from '../../config';

export const findAllTicket: any = async (req: Request, res: Response) => {
	try {
		const ticketData = await findAllTicketApi(req.params.ticketProgressId);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketData,
				title: null,
				message: null
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const findByIdTicket: any = async (req: Request, res: Response) => {
	try {
		const ticketData = await findByIdTicketApi(req.params.id);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketData,
				title: null,
				message: null
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const createOneTicket: any = async (req: Request, res: Response) => {
	try {
		const validated = await ticketSchema().validateAsync(req.body);

		// validated.createdByUserId = req.user.id;
		// validated.updatedByUserId = req.user.id;

		const ticketData = await createOneTicketApi(validated);

		return responseHandler(
			res,
			responseStatus.CREATED,
			{
				value: ticketData,
				title: 'Ticket',
				message: 'Successfully create ticket'
			}
		);

	} catch (err: any) {
		console.log(err)
		return await errorHandler(res, err);

	}
};

export const updateOneTicket: any = async (req: Request, res: Response) => {
	try {
		const validated = await ticketSchema().validateAsync(req.body);

		// validated.updatedByUserId = req.user.id;

		const ticketData = await updateOneTicketApi(req.params.id, validated);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketData,
				title: 'Ticket',
				message: 'Successfully update ticket'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const deleteOneTicket: any = async (req: Request, res: Response) => {
	try {
		const ticketData = await deleteOneTicketApi(req.params.id);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketData,
				title: 'Ticket',
				message: 'Successfully delete ticket'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

// OTHER API  ==================================================================================

export const updateManyTicketPosition = async (req: Request, res: Response) => {
	try {
		const ticketData = await updateManyTicketPositionApi(req.body);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketData,
				title: 'Ticket',
				message: 'Successfully update position ticket'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
}
