"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketTypeRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.ticketTypeRouter = (0, express_1.Router)();
exports.ticketTypeRouter
    .route('/dropdown')
    .get(controllers_1.findDropdownTicketType);
