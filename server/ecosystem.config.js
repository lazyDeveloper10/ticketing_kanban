module.exports = {
	name: 'ticket-server-app',
	script: './dist/app.js',
	instances: 1,          // number of workers you want to run
	env: {
		PM2_SERVE_PATH: './dist',
		PM2_SERVE_PORT: 3500
	}
};
