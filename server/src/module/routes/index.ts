import { Router } from 'express';

import { RouteInterface } from '../../models';

import { ticketRouter as indexTicketRouter } from './ticket.route';
import { ticketActivityRouter } from './ticket-activity.route';
import { ticketProgressRouter } from './ticket-progress.route';
import { ticketTypeRouter } from './ticket-type.route';

export const ticketRouter: Router = Router();

const routerRoutes: RouteInterface[] = [
	{
		path: '/activity',
		route: ticketActivityRouter,
	},
	{
		path: '/progress',
		route: ticketProgressRouter,
	},
	{
		path: '/type',
		route: ticketTypeRouter,
	},
	{
		path: '',
		route: indexTicketRouter,
	}
];

routerRoutes.forEach((route: RouteInterface) => {
	ticketRouter.use(route.path!, route.route);
});
