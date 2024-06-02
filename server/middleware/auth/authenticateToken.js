const jwt = require('jsonwebtoken');
// Used to document js
const express = require('express');
const { CustomError } = require('../../utils/classes');

/**
 * Middleware to authenticate an accessToken.
 *
 * @param {express.Request & {authorization: string}} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function authenticateToken(req, res, next) {
	try {
		if (req.cookies.token == null) {
			throw new CustomError('Missing access token', 401, {
				needRefresh: true,
				errors: { token: 'Missing access token' },
			});
		}

		accessToken = req.cookies.token;

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			res.locals.account_id = decoded.account_id;
			next();
		} catch (err) {
			if (err.message === 'jwt expired') {
				throw new CustomError('Access token expired', 400, {
					needRefresh: true,
					errors: { token: 'Access token expired' },
				});
			}
			throw new CustomError('Invalid access token', 400, {
				needRefresh: true,
				errors: { token: 'Invalid access token' },
			});
		}
	} catch (err) {
		err.message = `authenticateToken: ${err.message}`;
		next(err);
	}
}

module.exports = {
	authenticateToken,
};
