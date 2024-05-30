const { Router } = require('express');
const {
	validationResult,
	matchedData,
	checkSchema,
} = require('express-validator');
const {
	handleSchemaErrors,
} = require('../middleware/validation/handleSchemaErrors.js');
const pool = require('../db');
const bcrypt = require('bcrypt');
const registerAccountSchema = require('../middleware/validation/account/registerSchema.js');
const updateEmailSchema = require('../middleware//validation/account/updateEmailSchema.js');
const updatePasswordSchema = require('../middleware/validation/account/updatePasswordSchema.js');
const updateNameSchema = require('../middleware/validation/account/updateNameSchema.js');
const deleteAccountSchema = require('../middleware/validation/account/deleteAccountSchema.js');
const {
	authenticateToken,
} = require('../middleware/auth/authenticateToken.js');
const {
	authenticatePassword,
} = require('../middleware/auth/authenticatePassword.js');
const {
	confirmPwdMatches,
} = require('../middleware/validation/account/confirmPwdMatches.js');

const router = Router();

//==================
// Register account
//==================
router.post(
	'/register',
	[checkSchema(registerAccountSchema), handleSchemaErrors],
	async (req, res) => {
		const data = matchedData(req);
		const { email, pwd, first_name, last_name } = data;

		let emailIsActive;
		try {
			emailIsActive =
				(
					await pool.query(
						`SELECT *
						   FROM account
						  WHERE LOWER(email) = LOWER($1)`,
						[email]
					)
				).rowCount > 0;
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}

		if (emailIsActive) {
			return res
				.status(400)
				.json({ errors: { email: 'Email already in use' } });
		}

		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash_pass = bcrypt.hashSync(pwd, salt);

		try {
			await pool.query(
				`INSERT INTO account (email, hash_pass, first_name, last_name)
						  VALUES ($1, $2, $3, $4)
				   RETURNING account_id`,
				[email, hash_pass, first_name, last_name]
			);

			return res.status(201).json({ msg: 'Account created' });
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}
	}
);

//=============
// Update Name
//=============
router.post('/update-name', authenticateToken, [
	checkSchema(updateNameSchema),
	handleSchemaErrors,
	async (req, res) => {
		const data = matchedData(req);
		const { first_name, last_name } = data;

		// Declared in authenticateToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			console.log('res.locals missing account_id');
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		try {
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
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}
	},
]);

//==============
// Update Email
//==============
router.post(
	'/update-email',
	authenticateToken,
	[checkSchema(updateEmailSchema), handleSchemaErrors],
	authenticatePassword,
	async (req, res) => {
		const data = matchedData(req);
		const { email } = data;

		// Declared in authenticateToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			console.log('res.locals missing account_id');
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		let emailIsActive;
		try {
			emailIsActive =
				(
					await pool.query(
						`SELECT *
						   FROM account
						  WHERE LOWER(email) = LOWER($1)`,
						[email]
					)
				).rowCount > 0;
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}

		if (emailIsActive) {
			return res
				.status(400)
				.json({ errors: { email: 'Email already in use' } });
		}

		try {
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
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}
	}
);

//=================
// Update Password
//=================
router.post(
	'/update-password',
	authenticateToken,
	[checkSchema(updatePasswordSchema), handleSchemaErrors],
	confirmPwdMatches,
	authenticatePassword,
	async (req, res) => {
		const data = matchedData(req);
		const { newPwd } = data;

		// Declared in authenticateToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			console.log('res.locals missing account_id');
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const new_hash_pass = bcrypt.hashSync(newPwd, salt);

		try {
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
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}
	}
);

//=================
// Delete Acccount
//=================
router.delete(
	'/delete',
	authenticateToken,
	[checkSchema(deleteAccountSchema), handleSchemaErrors],
	authenticatePassword,
	async (req, res) => {
		// Declared in authenticateToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			console.log('res.locals missing account_id');
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		try {
			await pool.query(
				`DELETE FROM account
					WHERE account_id = $1`,
				[account_id]
			);

			return res.status(200).json({ msg: 'Account deleted' });
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}
	}
);

module.exports = { accountRouter: router };
