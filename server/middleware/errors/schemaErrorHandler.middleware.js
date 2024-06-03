const { validationResult } = require('express-validator');
const { CustomError } = require('../../utils/classes');

/**
 * Sends schema errors in response. If none exist, then calls next middleware.
 *
 * NOTE: This middleware is intended to run immediately after checkSchema.
 */
async function schemaErrorHandler(req, res, next) {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			let extractedErrors = {};

			result.array().forEach((error) => {
				// Extracting only one error per field since we intend to only display one
				// ...at a time on the front end.
				if (!Object.hasOwn(extractedErrors, error.path)) {
					extractedErrors[error.path] = error.msg;
				}
			});

			throw new CustomError('validation errors found', 400, {
				errors: extractedErrors,
			});
		}

		next();
	} catch (err) {
		err.message = `schemaErrorHandler: ${err.message}`;
		next(err);
	}
}

module.exports = {
	schemaErrorHandler,
};
