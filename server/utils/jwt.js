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

	// TODO: Extend expiresIn (currently 10s for testing purposes)
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

	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '30d',
	});
}

module.exports = {
	generateAccessToken,
	generateRefreshToken,
};
