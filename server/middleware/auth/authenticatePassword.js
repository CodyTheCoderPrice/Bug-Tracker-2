const { matchedData } = require('express-validator');
const pool = require('../../db.js');
const bcrypt = require('bcrypt');
const { CustomError } = require('../../utils/classes.js');
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
	try {
		const data = matchedData(req);
		const { pwd } = data;

		// Declared in authenticateToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const dbPwd = await pool.query(
			`SELECT hash_pass
         FROM account
        WHERE account_id = $1`,
			[account_id]
		);

		if (dbPwd.rowCount === 0) {
			throw new Error('No hash_pass for account');
		}

		const pwdMatch = bcrypt.compareSync(pwd, dbPwd.rows[0].hash_pass);

		if (!pwdMatch) {
			throw new CustomError('Incorrect password', 400, {
				errors: { pwd: 'Incorrect password' },
			});
		}

		next();
	} catch (err) {
		err.message = `authenticatePassword: ${err.message}`;
		next(err);
	}
}

module.exports = {
	authenticatePassword,
};
