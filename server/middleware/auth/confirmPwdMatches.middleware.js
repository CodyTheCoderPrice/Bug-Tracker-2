const { matchedData } = require('express-validator');

/**
 * Checks if confirmPwd matches newPwd andsends a response with an error message
 * if they do not. Otherwise, calls next middleware.
 *
 * NOTE: This middleware is intended to run after checkSchema and schemaErrorHandler.
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
