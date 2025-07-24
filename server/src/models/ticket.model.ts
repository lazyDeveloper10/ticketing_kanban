import joi from 'joi';

import {
	BaseDataInterface,
	baseSelectedValue,
	baseTicketProgressSelectedValue,
	TicketProgressInterface
} from './';

// noinspection Duplicates
export const ticketSchema = () => {
	return joi
		.object(
			{
				// ticketNumber: joi
				// 	.string()
				// 	.max(100)
				// 	.required(),

				ticketType: joi
					.string()
					.required(),

				ticketTitle: joi
					.string()
					.max(100)
					.required(),

				ticketDescription: joi
					.string()
					.required(),

				// position: joi
				// 	.number()
				// 	.precision(0)
				// 	.required(),

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

				activeFlag: joi
					.boolean()
					.default(true),

				ticketProgressId: joi
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

export interface TicketInterface extends BaseDataInterface {
	id: string;
	ticketType: string;
	ticketNumber: string;
	ticketTitle: string;
	ticketDescription: string;
	position: number;
	file1?: string | null;
	file2?: string | null;
	file3?: string | null;
	activeFlag: boolean;
	ticketProgress?: TicketProgressInterface | null;
	ticketProgressId: string;
}

export const baseTicketSelectedValue = {
	dropdown: () => {
		return {
			id: true,
			ticketType: true,
			ticketNumber: true,
			ticketTitle: true,
			position: true,
		}
	},
	base: (includeTimeStamps: boolean = false) => {
		return {
			id: true,
			ticketType: true,
			ticketNumber: true,
			ticketTitle: true,
			ticketDescription: true,
			position: true,
			file1: true,
			file2: true,
			file3: true,
			activeFlag: true,
			ticketProgress: {
				select: {
					...baseTicketProgressSelectedValue.dropdown()
				}
			},
			ticketProgressId: true,
			...(includeTimeStamps && baseSelectedValue.timeStamps())
		};
	}
};
