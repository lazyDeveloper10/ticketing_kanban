import { Request, Response } from 'express';

import { errorHandler, responseHandler, responseStatus } from '../../config';

export const findDropdownTicketType = async (req: Request, res: Response) => {
	try {
		return res.status(200).json(
			[
				{
					name: 'Bug',
					value: 'BUG_FIXED'
				},
				{
					name: 'Feature Request',
					value: 'FEATURE_REQUEST'
				},
				{
					name: 'Other',
					value: 'OTHER'
				},
			]
		);

	} catch (err: any) {
		return await errorHandler(res, err);

	}
};
