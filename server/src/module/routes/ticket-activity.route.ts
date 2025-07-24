import { Router } from 'express';

import {
	createOneTicketActivity,
	deleteOneTicketActivity,
	findAllTicketActivity,
	findByIdTicketActivity,
	updateOneTicketActivity
} from '../controllers';

export const ticketActivityRouter: Router = Router();

ticketActivityRouter
	.route('/')
	.post(createOneTicketActivity);

ticketActivityRouter
	.route('/many/:ticketId')
	.get(findAllTicketActivity)

ticketActivityRouter
	.route('/delete/:id')
	.delete(deleteOneTicketActivity);

ticketActivityRouter
	.route('/:id')
	.get(findByIdTicketActivity)
	.put(updateOneTicketActivity);
