import { Router } from 'express';

import { RouteInterface } from '../models';

import { ticketRouter } from '../module/routes';

export const router = Router();

const defaultRoutes: RouteInterface[] = [
	{
		path: '/ticket',
		route: ticketRouter,
	}
];

defaultRoutes.forEach((route: RouteInterface) => {
	router.use(route.path, route.route);
});
