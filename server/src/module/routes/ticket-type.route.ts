import { Router } from 'express';

import { findDropdownTicketType } from '../controllers';

export const ticketTypeRouter: Router = Router();

ticketTypeRouter
	.route('/dropdown')
	.get(findDropdownTicketType);
