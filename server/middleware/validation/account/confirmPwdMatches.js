const { matchedData } = require('express-validator');
// Used to document js
const express = require('express');

/**
 * Checks if confirmPwd matches newPwd andsends a response with an error message
 * if they do not. Otherwise, calls next middleware.
 *
 * NOTE: This middleware is intended to run after checkSchema and schemaErrorHandler.
 *
 * @param {express.Request & {authorization: string}} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function confirmPwdMatches(req, res, next) {
	const data = matchedData(req);
	const { newPwd, confirmPwd } = data;

	if (newPwd !== confirmPwd) {
		return res.status(400).json({
			errors: {
				confirmPwd: "Password confirmation doesn't match the new password",
			},
		});
	}

	next();
}

module.exports = {
	confirmPwdMatches,
};
