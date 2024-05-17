const { Router } = require('express');
const {
	validationResult,
	matchedData,
	checkSchema,
} = require('express-validator');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginAccountValidationSchema = require('../middleware/validation/auth/loginScema.js');
const { getEverythingForAccount } = require('../utils/queries.js');
const { authenticateToken } = require('../middleware/auth');

const router = Router();

//=======
// Login
//=======
router.post(
	'/login',
	checkSchema(loginAccountValidationSchema),
	async (req, res) => {
		const result = validationResult(req);
		if (!result.isEmpty()) {
			return res.status(400).send({ errors: result.array() });
		}

		const data = matchedData(req);
		const { email, password } = data;

		let idAndHashPass;
		try {
			idAndHashPass = await pool.query(
				`SELECT account_id, hash_pass
				   FROM account
					WHERE LOWER(email) = LOWER($1)`,
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

		const correctPassword = bcrypt.compareSync(
			password,
			idAndHashPass.rows[0].hash_pass
		);

		if (!correctPassword) {
			return res
				.status(403)
				.json({ success: false, msg: 'Incorrect password' });
		}

		let account;
		try {
			account = await getEverythingForAccount(idAndHashPass.rows[0].account_id);
		} catch (err) {
			return res.status(503).json({ success: false, msg: err.message });
		}

		const payload = {
			account_id: account.account_id,
		};

		try {
			const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

			return res.json({
				success: true,
				accessToken: accessToken,
				account: account,
			});
		} catch (err) {
			return res.status(500).json({ success: false, msg: err.message });
		}
	}
);

module.exports = { authRouter: router };
