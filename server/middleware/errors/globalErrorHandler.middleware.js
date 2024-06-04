/**
 * Middleware for all express errors to be handled by.
 *
 * NOTE: Should be passed last to app.use()
 */
function globalErrorHandler(err, req, res, next) {
	err.statusCode = err.statusCode || 500;
	err.json = err.json || { errors: { server: 'Server error' } };
	console.log(err.message);
	res.status(err.statusCode).json({ ...err.json, log: err.message });
}

module.exports = {
	globalErrorHandler,
};
