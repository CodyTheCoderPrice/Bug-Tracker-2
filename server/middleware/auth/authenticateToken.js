const jwt = require('jsonwebtoken');
// Used to document js
const express = require('express');

/**
 * Middleware to authenticate an accessToken.
 *
 * @param {express.Request & {authorization: string}} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function authenticateToken(req, res, next) {
	if (req.cookies.token == null) {
		return res
			.status(401)
			.json({ needRefresh: true, errors: { token: 'Missing access token' } });
	}

	accessToken = req.cookies.token;

	try {
		const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		res.locals.account_id = decoded.account_id;
		next();
	} catch (err) {
		if (err.message === 'jwt expired') {
			return res
				.status(400)
				.json({ needRefresh: true, errors: { token: 'Access token expired' } });
		}
		return res
			.status(403)
			.json({ needRefresh: true, errors: { token: 'Invalid access token' } });
	}
}

module.exports = {
	authenticateToken,
};
