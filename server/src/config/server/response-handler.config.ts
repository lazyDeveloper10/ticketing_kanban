import { Response } from 'express';

import {
	BaseResponseErrorBodyInterface,
	BaseResponseInterface,
	BaseResponsePaginationInterface
} from '../../models';
import { responseStatus } from './response-status.config';
import { logger } from '../../helpers';

export const responseHandler = (res: Response, status: number, data: BaseResponseInterface) => {
	return res.status(status).json(
		{
			...(data.value && { value: data.value }),
			...(data.title && { title: data.title }),
			...(data.message && { message: data.message }),
		}
	);
};

export const responsePaginationHandler = (res: Response, status: number, data: BaseResponsePaginationInterface) => {
	return res.status(status).json(
		{
			...(data.value && { value: data.value }),
			total: data.total,
			pages: data.total! / data.size! === 0 ? 1 : Math.ceil(data.total! / data.size!),
			...(data.page && { page: data.page }),
			...(data.size && { size: data.size }),
			...(data.sort && { sortBy: data.sort })
		}
	);
};

export const errorHandler = async (res: Response, err?: any) => {
	let resStatus: number = responseStatus.INTERNAL_SERVER_ERROR;
	let bodyError: BaseResponseErrorBodyInterface = {
		value: null,
		title: 'Internal Server Error',
		message: 'Error: Internal server error'
	};

	const defaultMessage = `${ res.req.method } | ${ res.req.headers.origin } | ${ res.req.headers['user-agent'] }`;

	if (err?.hasOwnProperty('details')) {
		console.log(err, 'ini di has own property details');
	}

	if (err?.message === 'Error: Internal server error') {
		resStatus = responseStatus.INTERNAL_SERVER_ERROR;

		bodyError.title = 'Internal Server Error';
		bodyError.message = err.message;

		logger.error(`${ defaultMessage } | ` + err.message);
	}

	if (err?.message.slice(0, 6) === 'Error:') {
		resStatus = responseStatus.BAD_REQUEST;

		bodyError.title = 'Request Error';
		bodyError.message = err.message;

		logger.error(`${ defaultMessage } | ` + err.message);
	}

	if (err?.message.slice(0, 13) === 'Unauthorized:') {
		resStatus = responseStatus.UNAUTHORIZED;

		bodyError.title = 'Unauthorized';
		bodyError.message = err.message;

		logger.error(`${ defaultMessage } | ` + err.message);
	}

	if (err?.message.slice(0, 10) === 'Forbidden:') {
		resStatus = responseStatus.FORBIDDEN;

		bodyError.title = 'Forbidden';
		bodyError.message = err.message;

		logger.error(`${ defaultMessage } | ` + err.message);
	}

	return responseHandler(res, resStatus, bodyError);
};

export const errorTransactionHandler = (err: any, defaultMessage: string) => {
	if (err?.message.slice(0, 6) === 'Error:') {
		throw new Error(err.message);

	} else {
		throw new Error(defaultMessage);
	}
};
