import { Request, Response } from 'express';

import {
	createOneTicketProgressApi,
	deleteOneTicketProgressApi,
	findAllTicketProgressApi,
	findByIdTicketProgressApi,
	findDropdownTicketProgressApi,
	updateManyTicketProgressPositionApi,
	updateOneTicketProgressApi
} from '../../api';
import { ticketProgressSchema } from '../../models';
import { errorHandler, responseHandler, responseStatus } from '../../config';

export const findAllTicketProgress: any = async (req: Request, res: Response) => {
	try {
		const ticketProgressData = await findAllTicketProgressApi();

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketProgressData,
				title: null,
				message: null
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const findByIdTicketProgress: any = async (req: Request, res: Response) => {
	try {
		const ticketProgressData = await findByIdTicketProgressApi(req.params.id);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketProgressData,
				title: null,
				message: null
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const findDropdownTicketProgress = async (req: Request, res: Response) => {
	try {
		const ticketProgressData = await findDropdownTicketProgressApi();

		return res.status(200).json(ticketProgressData);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
}

export const createOneTicketProgress: any = async (req: Request, res: Response) => {
	try {
		const validated = await ticketProgressSchema().validateAsync(req.body);

		// validated.createdByUserId = req.user.id;
		// validated.updatedByUserId = req.user.id;

		const ticketProgressData = await createOneTicketProgressApi(validated);

		return responseHandler(
			res,
			responseStatus.CREATED,
			{
				value: ticketProgressData,
				title: 'Ticket Progress',
				message: 'Successfully create ticket progress'
			}
		);

	} catch (err: any) {
		console.log(err)
		return await errorHandler(res, err);

	}
};

export const updateOneTicketProgress: any = async (req: Request, res: Response) => {
	try {
		const validated = await ticketProgressSchema().validateAsync(req.body);

		// validated.updatedByUserId = req.user.id;

		const ticketProgressData = await updateOneTicketProgressApi(req.params.id, validated);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketProgressData,
				title: 'Ticket Progress',
				message: 'Successfully update ticket progress'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

export const deleteOneTicketProgress: any = async (req: Request, res: Response) => {
	try {
		const ticketProgressData = await deleteOneTicketProgressApi(req.params.id);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketProgressData,
				title: 'Ticket Progress',
				message: 'Successfully delete ticket progress'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};

// OTHER API  ==================================================================================

export const updateManyTicketProgressPosition = async (req: Request, res: Response) => {
	try {
		const ticketProgressData = await updateManyTicketProgressPositionApi(req.body);

		return responseHandler(
			res,
			responseStatus.OK,
			{
				value: ticketProgressData,
				title: 'Ticket Progress',
				message: 'Successfully update position ticket progress'
			}
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
}
