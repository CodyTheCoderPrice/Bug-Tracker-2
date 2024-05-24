const { Router } = require('express');
const {
	validationResult,
	matchedData,
	checkSchema,
} = require('express-validator');
const pool = require('../db');
const bcrypt = require('bcrypt');
const registerAccountValidationSchema = require('../validation/account/registerSchema.js');

const router = Router();

//==================
// Register account
//==================
router.post(
	'/register',
	checkSchema(registerAccountValidationSchema),
	async (req, res) => {
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
						`SELECT *
						   FROM account
						  WHERE LOWER(email) = LOWER($1)`,
						[email]
					)
				).rowCount > 0;
		} catch (err) {
			return res.status(503).json({ msg: err.message });
		}

		if (emailIsActive) {
			return res.status(400).json({ msg: 'Email already in use' });
		}

		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash_pass = bcrypt.hashSync(password, salt);

		try {
			await pool.query(
				`INSERT INTO account (email, hash_pass, first_name, last_name)
						VALUES($1, $2, $3, $4)
							RETURNING account_id`,
				[email, hash_pass, first_name, last_name]
			);

			return res.status(201).json({ success: true, msg: 'Account created' });
		} catch (err) {
			return res.status(503).json({ msg: err.message });
		}
	}
);

module.exports = { accountRouter: router };
