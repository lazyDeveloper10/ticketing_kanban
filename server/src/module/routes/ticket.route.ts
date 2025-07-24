import { Router } from 'express';

import {
	createOneTicket,
	deleteOneTicket,
	findAllTicket,
	findByIdTicket,
	updateManyTicketPosition,
	updateOneTicket
} from '../controllers';

export const ticketRouter: Router = Router();

ticketRouter
	.route('/')
	.post(createOneTicket);

ticketRouter
	.route('/many/:ticketProgressId')
	.get(findAllTicket)

ticketRouter
	.route('/position')
	.put(updateManyTicketPosition);

ticketRouter
	.route('/delete/:id')
	.delete(deleteOneTicket);

ticketRouter
	.route('/:id')
	.get(findByIdTicket)
	.put(updateOneTicket);
