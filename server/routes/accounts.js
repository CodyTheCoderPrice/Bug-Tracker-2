const { Router } = require('express');
const {
	validationResult,
	matchedData,
	checkSchema,
} = require('express-validator');
const pool = require('../db');
// Used instead of the Date() function
const moment = require('moment');
const registerAccountValidationSchema = require('../validation/accounts/registerSchema.js');
const { hashPassword } = require('../utils/password.js');

const router = Router();

router.route('/api/error').post(async (req, res) => {
	try {
		const shouldThrowError = await pool.query('SELECT * FROM absentTable');
	} catch (err) {
		console.error(err.message);
		return res.sendStatus(503);
	}
});

//==================
// Register account
//==================
router
	.route('/api/account/register')
	.post(checkSchema(registerAccountValidationSchema), async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(400).send({ errors: result.array() });
		}

		const data = matchedData(req);
		const { email, password, first_name, last_name } = data;
		const join_date = moment.utc().format('YYYY-MM-DD');
		// Current time in unix/epoch timestamp
		const last_edited_timestamp = moment.utc().format('X');

		let emailIsActive;
		try {
			emailIsActive =
				(
					await pool.query(
						'SELECT * FROM account WHERE LOWER(email) = LOWER($1)',
						[email]
					)
				).rowCount > 0;
		} catch (err) {
			return res.status(503).json({ success: false, msg: err.message });
		}

		if (emailIsActive) {
			return res
				.status(400)
				.json({ success: false, msg: 'Email already in use' });
		}

		const hash_pass = hashPassword(password);
		try {
			const newAccount = await pool.query(
				`INSERT INTO account (email, hash_pass, first_name, last_name, join_date, last_edited_timestamp)
						VALUES($1, $2, $3, $4, $5, $6)
							RETURNING account_id`,
				[
					email,
					hash_pass,
					first_name,
					last_name,
					join_date,
					last_edited_timestamp,
				]
			);

			return res.status(201).json({ success: true, msg: 'Account created' });
		} catch (err) {
			return res.status(503).json({ success: false, msg: err.message });
		}
	});

module.exports = { accountRouter: router };
