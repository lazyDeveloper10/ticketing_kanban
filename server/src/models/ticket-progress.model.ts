import joi from 'joi';

import { BaseDataInterface, baseSelectedValue, baseTicketSelectedValue } from './';

// noinspection Duplicates
export const ticketProgressSchema = () => {
	return joi
		.object(
			{
				ticketProgressName: joi
					.string()
					.max(50)
					.required(),

				ticketProgressCode: joi
					.string()
					.max(50)
					.empty('')
					.allow('')
					.allow(null)
					.default(null),

				// position: joi
				// 	.number()
				// 	.precision(0)
				// 	.required(),

				theme: joi
					.string()
					.empty('')
					.allow('')
					.allow(null)
					.default(null),

				description: joi
					.string()
					.empty('')
					.allow('')
					.allow(null)
					.default(null),

				createdBy: joi
					.string()
					.empty('')
					.allow('')
					.allow(null)
					.default(null),

				updatedBy: joi
					.string()
					.empty('')
					.allow('')
					.allow(null)
					.default(null),
			}
		)
		.options(
			{
				abortEarly: false,
				stripUnknown: true
			}
		);
};

export interface TicketProgressInterface extends BaseDataInterface {
	id: string;
	ticketProgressName: string;
	ticketProgressCode?: string | null;
	position: number;
	theme?: string | null;
	description?: string | null;
}

export const baseTicketProgressSelectedValue = {
	dropdown: () => {
		return {
			id: true,
			ticketProgressName: true,
			position: true,
			theme: true,
		};
	},
	base: (includeTimeStamps: boolean = false) => {
		return {
			id: true,
			ticketProgressName: true,
			ticketProgressCode: true,
			position: true,
			theme: true,
			description: true,
			...(includeTimeStamps && baseSelectedValue.timeStamps())
		};
	},
	baseDetail: (includeTimeStamps: boolean = false) => {
		return {
			id: true,
			ticketProgressName: true,
			ticketProgressCode: true,
			position: true,
			theme: true,
			description: true,

			ticketProgressTicketTicketProgress: {
				select: {
					...baseTicketSelectedValue.base(true)
				},
				orderBy: [
					{
						position: 'asc'
					}
				]
			},

			...(includeTimeStamps && baseSelectedValue.timeStamps())
		};
	},
};
