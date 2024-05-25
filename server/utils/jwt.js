const jwt = require('jsonwebtoken');
// Used to document js
const express = require('express');

/**
 * Generates an access token that will expire.
 *
 * @param {number} account_id - Account id.
 * @returns {string} Returns access jwtoken.
 */
function generateAccessToken(account_id) {
	if (account_id == null) {
		throw new Error('account_id is empty');
	}

	const payload = {
		account_id: account_id,
	};

	// TODO: Extend expiresIn (currently 15s for testing purposes)
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '10s',
	});
}

/**
 * Generates a refresh token.
 *
 * @param {number} account_id - Account id.
 * @returns {string} Returns resfresh jwtoken.
 */
function generateRefreshToken(account_id) {
	if (account_id == null) {
		throw new Error('account_id is empty');
	}

	const payload = {
		account_id: account_id,
	};

	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

/**
 * Middleware to authenticate an accessToken.
 *
 * @param {express.Request & {authorization: string}} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function authenticateToken(req, res, next) {
	if (req.cookies.token == null) {
		return res.status(401).send({ msg: 'Missing access token' });
	}

	accessToken = req.cookies.token;

	try {
		const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		res.locals.account_id = decoded.account_id;
		next();
	} catch (err) {
		return res.status(403).json({ msg: err.message });
	}
}

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	authenticateToken,
};
