"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const routes_1 = require("../module/routes");
exports.router = (0, express_1.Router)();
const defaultRoutes = [
    {
        path: '/ticket',
        route: routes_1.ticketRouter,
    }
];
defaultRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
