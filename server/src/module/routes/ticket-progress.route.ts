import { Router } from 'express';

import {
	createOneTicketProgress,
	deleteOneTicketProgress,
	findAllTicketProgress,
	findByIdTicketProgress,
	findDropdownTicketProgress,
	updateManyTicketProgressPosition,
	updateOneTicketProgress
} from '../controllers';

export const ticketProgressRouter: Router = Router();

ticketProgressRouter
	.route('/')
	.get(findAllTicketProgress)
	.post(createOneTicketProgress);

ticketProgressRouter
	.route('/dropdown')
	.get(findDropdownTicketProgress);

ticketProgressRouter
	.route('/position')
	.put(updateManyTicketProgressPosition);

ticketProgressRouter
	.route('/delete/:id')
	.delete(deleteOneTicketProgress);

ticketProgressRouter
	.route('/:id')
	.get(findByIdTicketProgress)
	.put(updateOneTicketProgress);
