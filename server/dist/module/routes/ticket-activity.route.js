"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketActivityRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.ticketActivityRouter = (0, express_1.Router)();
exports.ticketActivityRouter
    .route('/')
    .post(controllers_1.createOneTicketActivity);
exports.ticketActivityRouter
    .route('/many/:ticketId')
    .get(controllers_1.findAllTicketActivity);
exports.ticketActivityRouter
    .route('/delete/:id')
    .delete(controllers_1.deleteOneTicketActivity);
exports.ticketActivityRouter
    .route('/:id')
    .get(controllers_1.findByIdTicketActivity)
    .put(controllers_1.updateOneTicketActivity);
