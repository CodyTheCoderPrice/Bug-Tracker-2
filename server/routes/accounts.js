const { Router } = require('express');
const {
	validationResult,
	matchedData,
	checkSchema,
} = require('express-validator');
const pool = require('../db');
const { hashPassword, comparePassword } = require('../utils/password.js');
const registerAccountValidationSchema = require('../validation/accounts/registerSchema.js');
const loginAccountValidationSchema = require('../validation/accounts/loginScema.js');

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
				`INSERT INTO account (email, hash_pass, first_name, last_name)
						VALUES($1, $2, $3, $4)
							RETURNING account_id`,
				[email, hash_pass, first_name, last_name]
			);

			return res.status(201).json({ success: true, msg: 'Account created' });
		} catch (err) {
			return res.status(503).json({ success: false, msg: err.message });
		}
	});

//===============
// Login account
//===============
router
	.route('/api/account/login')
	.post(checkSchema(loginAccountValidationSchema), async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(400).send({ errors: result.array() });
		}

		const data = matchedData(req);
		const { email, password } = data;

		let idAndHashPass;
		try {
			idAndHashPass = await pool.query(
				`SELECT account_id, hash_pass FROM account WHERE LOWER(email) = LOWER($1)`,
				[email]
			);
		} catch (err) {
			return res.status(503).json({ success: false, msg: err.message });
		}

		if (idAndHashPass.rowCount === 0) {
			return res
				.status(401)
				.json({ success: false, msg: 'Email unregistered' });
		}

		const correctPassword = comparePassword(
			password,
			idAndHashPass.rows[0].hash_pass
		);

		if (!correctPassword) {
			return res
				.status(403)
				.json({ success: false, msg: 'Incorrect password' });
		}

		// TODO: Retrieve everthing for account
	});

module.exports = { accountRouter: router };
