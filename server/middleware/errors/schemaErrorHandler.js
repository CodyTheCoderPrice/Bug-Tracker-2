const { validationResult } = require('express-validator');
const { CustomError } = require('../../utils/classes');
// Used to document js
const express = require('express');

/**
 * Sends schema errors in response. If none exist, then calls next middleware.
 *
 * NOTE: This middleware is intended to run immediately after checkSchema.
 *
 * @param {express.Request & {authorization: string}} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
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

			throw new CustomError(
				'schemaErrorHandler: validation errors found',
				400,
				{ errors: extractedErrors }
			);
		}

		next();
	} catch (err) {
		next(err);
	}
}

module.exports = {
	schemaErrorHandler,
};
