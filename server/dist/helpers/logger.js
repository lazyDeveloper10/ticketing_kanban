"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importStar(require("winston"));
const customLogLevels = {
    levels: {
        error: 2,
        http: 1,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'blue',
        debug: 'green'
    }
};
winston_1.default.addColors(customLogLevels.colors);
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.errors({ stack: true }), winston_1.format.metadata(), winston_1.format.timestamp(), winston_1.format.prettyPrint()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            level: 'http',
            filename: 'logs/http.log',
        }),
        new winston_1.transports.File({
            level: 'error',
            filename: 'logs/error.log',
        }),
    ]
});
