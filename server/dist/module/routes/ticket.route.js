"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.ticketRouter = (0, express_1.Router)();
exports.ticketRouter
    .route('/')
    .post(controllers_1.createOneTicket);
exports.ticketRouter
    .route('/many/:ticketProgressId')
    .get(controllers_1.findAllTicket);
exports.ticketRouter
    .route('/position')
    .put(controllers_1.updateManyTicketPosition);
exports.ticketRouter
    .route('/delete/:id')
    .delete(controllers_1.deleteOneTicket);
exports.ticketRouter
    .route('/:id')
    .get(controllers_1.findByIdTicket)
    .put(controllers_1.updateOneTicket);
