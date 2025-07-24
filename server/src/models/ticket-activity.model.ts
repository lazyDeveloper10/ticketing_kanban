import joi from 'joi';

import {
	BaseDataInterface,
	baseSelectedValue,
	baseTicketSelectedValue,
	TicketInterface,
} from './';

// noinspection Duplicates
export const ticketActivitySchema = () => {
	return joi
		.object(
			{
				// activityId: joi
				// 	.string()
				// 	.max(100)
				// 	.required(),

				activity: joi
					.string()
					.required(),

				file1: joi
					.string()
					.empty('')
					.allow('')
					.allow(null)
					.default(null),

				file2: joi
					.string()
					.empty('')
					.allow('')
					.allow(null)
					.default(null),

				file3: joi
					.string()
					.empty('')
					.allow('')
					.allow(null)
					.default(null),

				ticketId: joi
					.string()
					.required(),

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

export interface TicketActivityInterface extends BaseDataInterface {
	id: string;
	activityNumber: string;
	activity: string;
	file1?: string | null;
	file2?: string | null;
	file3?: string | null;
	ticket?: TicketInterface | null;
	ticketId: string;
}

export const baseTicketActivitySelectedValue = {
	base: (includeTimeStamps: boolean = false) => {
		return {
			id: true,
			activityNumber: true,
			activity: true,
			file1: true,
			file2: true,
			file3: true,
			ticket: {
				select: {
					...baseTicketSelectedValue.dropdown()
				}
			},
			ticketId: true,
			...(includeTimeStamps && baseSelectedValue.timeStamps())
		};
	}
};
