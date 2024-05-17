const jwt = require('jsonwebtoken');
// Used to document js
const express = require('express');

/**
 * Generates an access token that will expire.
 *
 * @param {number} account_id - Account id.
 * @returns {string} Returns jwtoken containing the account id.
 */
function generateAccessToken(account_id) {
	if (account_id === undefined || account_id === null) {
		throw new Error('account_id is empty.');
	}

	const payload = {
		account_id: account_id,
	};

	// TODO: Extend expiresIn (currently 15s for testing purposes)
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
}

/**
 * Generates a refresh token.
 *
 * @param {number} account_id - Account id.
 * @returns {string} Returns jwtoken containing the account id.
 */
function generateRefreshToken(account_id) {
	if (account_id === undefined || account_id === null) {
		throw new Error('account_id is empty.');
	}

	const payload = {
		account_id: account_id,
	};

	// TODO: Extend expiresIn (currently 15s for testing purposes)
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

/**
 * Middleware to authenticate an accessToken.
 *
 * @param {express.Request & {accessToken : string}} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
function authenticateToken(req, res, next) {
	const accessToken = req.header('accessToken');

	if (accessToken === undefined) {
		return res.status(401).send({ success: false, msg: 'Missing accessToken' });
	}

	try {
		const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		req.account_id = payload.account_id;
		next();
	} catch (err) {
		return res.status(403).json({ success: false, msg: err });
	}
}

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	authenticateToken,
};
