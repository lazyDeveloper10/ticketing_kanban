"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketProgressRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.ticketProgressRouter = (0, express_1.Router)();
exports.ticketProgressRouter
    .route('/')
    .get(controllers_1.findAllTicketProgress)
    .post(controllers_1.createOneTicketProgress);
exports.ticketProgressRouter
    .route('/dropdown')
    .get(controllers_1.findDropdownTicketProgress);
exports.ticketProgressRouter
    .route('/position')
    .put(controllers_1.updateManyTicketProgressPosition);
exports.ticketProgressRouter
    .route('/delete/:id')
    .delete(controllers_1.deleteOneTicketProgress);
exports.ticketProgressRouter
    .route('/:id')
    .get(controllers_1.findByIdTicketProgress)
    .put(controllers_1.updateOneTicketProgress);
