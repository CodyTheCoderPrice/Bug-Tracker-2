class CustomError extends Error {
	constructor(message, statusCode, json) {
		super(message);
		this.statusCode = statusCode;
		this.json = json;
	}
}

module.exports = { CustomError };
