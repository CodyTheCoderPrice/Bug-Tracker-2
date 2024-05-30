const { matchedData } = require('express-validator');
const pool = require('../../db.js');
const bcrypt = require('bcrypt');
// Used to document js
const express = require('express');

/**
 * Middleware to authenticate a password matches the DB.
 *
 * NOTE: This middleware relies on authenticateToken and checkSchema having ran
 * prior.
 *
 * @param {express.Request & {authorization: string}} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function authenticatePassword(req, res, next) {
	const data = matchedData(req);
	const { pwd } = data;

	// Declared in authenticateToken middleware
	const account_id = res.locals.account_id;

	if (account_id == null) {
		console.log('res.locals missing account_id');
		return res.status(500).json({ errors: { server: 'Server error' } });
	}

	let dbPwd;
	try {
		dbPwd = await pool.query(
			`SELECT hash_pass
         FROM account
        WHERE account_id = $1`,
			[account_id]
		);
	} catch (err) {
		console.log(err.message);
		return res.status(503).json({ errors: { server: 'Server error' } });
	}

	if (dbPwd.rowCount === 0) {
		console.log('No hash_pass for account');
		return res.status(503).json({ errors: { server: 'Server error' } });
	}

	const pwdMatch = bcrypt.compareSync(pwd, dbPwd.rows[0].hash_pass);

	if (!pwdMatch) {
		return res.status(400).json({ errors: { pwd: 'Incorrect password' } });
	}

	next();
}

module.exports = {
	authenticatePassword,
};
