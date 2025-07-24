import { createServer } from 'http';

import express, { Express } from 'express';

// @ts-ignore
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import env from 'dotenv';

import { router } from './routes';
import { responseStatus } from './config';
import { logger } from './helpers';

env.config();

declare global {
	namespace Express {
		export interface Request {
		}
	}
}

const app: Express = express();
const port: number = Number(process.env.APP_PORT);

const httpServer = createServer(app);

const stream = {
	write: (message: any) => logger.http(message),
};

app.disable('x-powered-by');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set security http headers
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

// cors
app.use(cors());

// logger
app.use(morgan('combined', { stream }));

// robot
app.use(express.static('public'));

app.use('/api', router);

app.all('{*splat}', (req, res) => {
	res.status(responseStatus.NOT_FOUND).json({
		message: 'Error: PAGE NOT FOUND'
	});
});

httpServer.listen(port, () => {
	console.log(`🚀 Server ready on port ${ port }`);
});
