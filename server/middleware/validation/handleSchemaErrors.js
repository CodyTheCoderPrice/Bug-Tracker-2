const { validationResult } = require('express-validator');
const { extractValidationErrors } = require('../../utils/errorHandling.js');
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
async function handleSchemaErrors(req, res, next) {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res
			.status(400)
			.json({ errors: extractValidationErrors(result.array()) });
	}

	next();
}

module.exports = {
	handleSchemaErrors,
};
