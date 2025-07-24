import winston, { createLogger, format, transports } from 'winston';

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

winston.addColors(customLogLevels.colors);

export const logger = createLogger({
	format: format.combine(
		format.json(),
		format.errors({ stack: true }),
		format.metadata(),
		format.timestamp(),
		format.prettyPrint()
	),
	transports: [
		new transports.Console(),
		new transports.File(
			{
				level: 'http',
				filename: 'logs/http.log',
			}
		),
		new transports.File(
			{
				level: 'error',
				filename: 'logs/error.log',
			}
		),
	]
});
