"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
// @ts-ignore
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const config_1 = require("./config");
const helpers_1 = require("./helpers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.APP_PORT);
const httpServer = (0, http_1.createServer)(app);
const stream = {
    write: (message) => helpers_1.logger.http(message),
};
app.disable('x-powered-by');
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// set security http headers
app.use(helmet_1.default.contentSecurityPolicy());
app.use(helmet_1.default.crossOriginEmbedderPolicy());
app.use(helmet_1.default.crossOriginOpenerPolicy());
app.use(helmet_1.default.crossOriginResourcePolicy());
app.use(helmet_1.default.dnsPrefetchControl());
app.use(helmet_1.default.frameguard());
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.hsts());
app.use(helmet_1.default.ieNoOpen());
app.use(helmet_1.default.noSniff());
app.use(helmet_1.default.originAgentCluster());
app.use(helmet_1.default.permittedCrossDomainPolicies());
app.use(helmet_1.default.referrerPolicy());
app.use(helmet_1.default.xssFilter());
// cors
app.use((0, cors_1.default)());
// logger
app.use((0, morgan_1.default)('combined', { stream }));
// robot
app.use(express_1.default.static('public'));
app.use('/api', routes_1.router);
app.all('{*splat}', (req, res) => {
    res.status(config_1.responseStatus.NOT_FOUND).json({
        message: 'Error: PAGE NOT FOUND'
    });
});
httpServer.listen(port, () => {
    console.log(`🚀 Server ready on port ${port}`);
});
