"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = require("express");
const ticket_route_1 = require("./ticket.route");
const ticket_activity_route_1 = require("./ticket-activity.route");
const ticket_progress_route_1 = require("./ticket-progress.route");
const ticket_type_route_1 = require("./ticket-type.route");
exports.ticketRouter = (0, express_1.Router)();
const routerRoutes = [
    {
        path: '/activity',
        route: ticket_activity_route_1.ticketActivityRouter,
    },
    {
        path: '/progress',
        route: ticket_progress_route_1.ticketProgressRouter,
    },
    {
        path: '/type',
        route: ticket_type_route_1.ticketTypeRouter,
    },
    {
        path: '',
        route: ticket_route_1.ticketRouter,
    }
];
routerRoutes.forEach((route) => {
    exports.ticketRouter.use(route.path, route.route);
});
