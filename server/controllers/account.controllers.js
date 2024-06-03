const { matchedData } = require('express-validator');
const pool = require('../database/db.js');
const bcrypt = require('bcrypt');
const { CustomError } = require('../utils/classes.js');

/**
 * Controller to register an account in the DB.
 *
 * NOTE: Intended to run after checkSchema and schemaErrorHandler.
 */
const registerAccount = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { email, pwd, first_name, last_name } = data;

		const emailInUse =
			(
				await pool.query(
					`SELECT account_id
               FROM account
              WHERE LOWER(email) = LOWER($1)`,
					[email]
				)
			).rowCount > 0;

		if (emailInUse) {
			throw new CustomError('Email already in use', 400, {
				errors: { email: 'Email already in use' },
			});
		}

		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash_pass = bcrypt.hashSync(pwd, salt);

		await pool.query(
			`INSERT INTO account (email, hash_pass, first_name, last_name)
            VALUES ($1, $2, $3, $4)
         RETURNING account_id`,
			[email, hash_pass, first_name, last_name]
		);

		return res.status(201).json({ msg: 'Account created' });
	} catch (err) {
		err.message = `register-account: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to update an account's name in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema, and schemaErrorHandler.
 */
const updateAccountName = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { first_name, last_name } = data;

		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const updatedAccount = await pool.query(
			`UPDATE account
            SET first_name = $1, last_name = $2
          WHERE account_id = $3
         RETURNING account_id, email, first_name, last_name, create_time, update_time`,
			[first_name, last_name, account_id]
		);

		if (updatedAccount.rowCount === 0) {
			throw new Error('Database failed to update account name');
		}

		return res.status(200).json({ account: updatedAccount.rows[0] });
	} catch (err) {
		err.message = `update-name: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to update an account's email in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema, schemaErrorHandler, and
 * authPassword.
 */
const updateAccountEmail = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { email } = data;

		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const emailInUse =
			(
				await pool.query(
					`SELECT account_id
               FROM account
              WHERE LOWER(email) = LOWER($1)`,
					[email]
				)
			).rowCount > 0;

		if (emailInUse) {
			throw new CustomError('Email already in use', 400, {
				errors: { email: 'Email already in use' },
			});
		}

		const updatedAccount = await pool.query(
			`UPDATE account
            SET email = $1
          WHERE account_id = $2
         RETURNING account_id, email, first_name, last_name, create_time, update_time`,
			[email, account_id]
		);

		if (updatedAccount.rowCount === 0) {
			throw new Error('Database failed to update account email');
		}

		return res.status(200).json({ account: updatedAccount.rows[0] });
	} catch (err) {
		err.message = `update-email: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to update an account's password in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema, schemaErrorHandler,
 * confirmPwdMatches, and authPassword.
 */
const updateAccountPassword = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { newPwd } = data;

		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const new_hash_pass = bcrypt.hashSync(newPwd, salt);

		const updatedAccount = await pool.query(
			`UPDATE account
            SET hash_pass = $1
          WHERE account_id = $2
         RETURNING account_id, email, first_name, last_name, create_time, update_time`,
			[new_hash_pass, account_id]
		);

		if (updatedAccount.rowCount === 0) {
			throw new Error('Database failed to update account password');
		}

		return res.status(200).json({ account: updatedAccount.rows[0] });
	} catch (err) {
		err.message = `update-password: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to delete an account in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema, schemaErrorHandler, and
 * authPassword.
 */
const deleteAccount = async (req, res, next) => {
	try {
		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const deletedAccount = await pool.query(
			`DELETE FROM account
        WHERE account_id = $1`,
			[account_id]
		);

		if (deletedAccount.rowCount === 0) {
			throw new Error('Database failed to delete account');
		}

		return res.status(200).json({ msg: 'Account deleted' });
	} catch (err) {
		err.message = `delete-account: ${err.message}`;
		next(err);
	}
};

module.exports = {
	registerAccount,
	updateAccountName,
	updateAccountEmail,
	updateAccountPassword,
	deleteAccount,
};
