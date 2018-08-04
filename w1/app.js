// Require Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

// Init App
const app = express();

// Basic Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routing middleware
app.use('/api', router);  // localhost:3000/api

// Error-handling middleware
app.use('*', (err, req, res, next) => {
	const message = err.message || 'Something went wrong with the server!';
	const stackTrace = err.trace || 'No stack trace provided';
	const status = err.status || 500;
	const error = {
		message,
		stackTrace,
		status
	};
	res.status(status).json(error);
});


// Listen on server
app.listen(3000, () => {
	console.log('Server is like totally listening on this port here called 3000!');
})
