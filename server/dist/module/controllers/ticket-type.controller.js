"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDropdownTicketType = void 0;
const config_1 = require("../../config");
const findDropdownTicketType = async (req, res) => {
    try {
        return res.status(200).json([
            {
                name: 'Bug',
                value: 'BUG_FIXED'
            },
            {
                name: 'Feature Request',
                value: 'FEATURE_REQUEST'
            },
            {
                name: 'Other',
                value: 'OTHER'
            },
        ]);
    }
    catch (err) {
        return await (0, config_1.errorHandler)(res, err);
    }
};
exports.findDropdownTicketType = findDropdownTicketType;
