const { Router } = require('express');
const {
	validationResult,
	matchedData,
	checkSchema,
} = require('express-validator');
const pool = require('../db');
const bcrypt = require('bcrypt');
const registerAccountValidationSchema = require('../validation/account/registerSchema.js');
const { extractValidationErrors } = require('../utils/errorHandling.js');

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
			return res
				.status(400)
				.json({ errors: extractValidationErrors(result.array()) });
		}

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
						VALUES($1, $2, $3, $4)
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

module.exports = { accountRouter: router };
