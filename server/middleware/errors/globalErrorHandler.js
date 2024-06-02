function globalErrorHandler(err, req, res, next) {
	err.statusCode = err.statusCode || 500;
	err.json = err.json || { errors: { server: 'Server error' } };
	console.log(err.message);
	res.status(err.statusCode).json(err.json);
}

module.exports = {
	globalErrorHandler,
};
