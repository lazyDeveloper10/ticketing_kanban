import {
	createOne,
	deleteOne,
	findById,
	findDropdown,
	updateOne
} from '../api';
import { baseTicketActivitySelectedValue } from '../models';

// CRUD API   ==================================================================================

export const findAllTicketActivityApi = async (ticketId: string) => {
	const ticketActivityData = await findDropdown(
		{
			model: 'ticketActivity',
			condition: {
				ticketId: ticketId
			},
			selectedFields: baseTicketActivitySelectedValue.base(true),
			orderBy: [
				{
					createdAt: 'desc'
				}
			]
		}
	);

	if (ticketActivityData.length) {
		ticketActivityData.map((item: any) => {

			item.createdBy = JSON.parse(item.createdBy);

			return item;
		});
	}

	return ticketActivityData;
};

export const findByIdTicketActivityApi = async (id: string) => {
	return await findById(
		{
			model: 'ticketActivity',
			condition: {
				id: id
			},
			selectedFields: baseTicketActivitySelectedValue.base(),
		}
	);
};

export const createOneTicketActivityApi = async (body: any) => {
	return await createOne(
		{
			model: 'ticketActivity',
			selectedFields: baseTicketActivitySelectedValue.base(),
		},
		body
	);
};

export const updateOneTicketActivityApi = async (id: string, body: any) => {
	return await updateOne(
		{
			model: 'ticketActivity',
			condition: {
				id: id
			},
			selectedFields: baseTicketActivitySelectedValue.base(),
		},
		body,
	);
};

export const deleteOneTicketActivityApi = async (id: string) => {
	return await deleteOne(
		{
			model: 'ticketActivity',
			condition: {
				id: id
			},
			selectedFields: baseTicketActivitySelectedValue.base(),
		}
	);
};
