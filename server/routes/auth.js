const { Router } = require('express');
const {
	validationResult,
	matchedData,
	checkSchema,
} = require('express-validator');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginAccountValidationSchema = require('../validation/auth/loginScema.js');
const { getEverythingForAccount } = require('../utils/queries.js');
const {
	generateAccessToken,
	generateRefreshToken,
	authenticateToken,
} = require('../utils/jwt.js');

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
		const { email, pwd } = data;

		let idAndHashPass;
		try {
			idAndHashPass = await pool.query(
				`SELECT account_id, hash_pass
				   FROM account
					WHERE LOWER(email) = LOWER($1)`,
				[email]
			);
		} catch (err) {
			return res.status(503).json({ msg: err.message });
		}

		if (idAndHashPass.rowCount === 0) {
			return res.status(401).json({ msg: 'Email unregistered' });
		}

		const correctpwd = bcrypt.compareSync(pwd, idAndHashPass.rows[0].hash_pass);

		if (!correctpwd) {
			return res.status(403).json({ msg: 'Incorrect password' });
		}

		let account;
		try {
			({ account, test1, test2 } = await getEverythingForAccount(
				idAndHashPass.rows[0].account_id
			));
		} catch (err) {
			return res.status(503).json({ msg: err.message });
		}

		if (account.account_id === undefined || account.account_id === null) {
			return res.status(500).json({ msg: 'account_id is empty.' });
		}

		let accessToken, refreshToken;
		try {
			accessToken = generateAccessToken(account.account_id);
			refreshToken = generateRefreshToken(account.account_id);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}

		try {
			await pool.query(
				`UPDATE account
				 SET refresh_token = ($1)
				 WHERE account_id = ($2)`,
				[refreshToken, account.account_id]
			);
		} catch (err) {
			return res.status(503).json({ msg: err.message });
		}

		return res.json({
			success: true,
			accessToken: accessToken,
			refreshToken: refreshToken,
			account: account,
		});
	}
);

router.post('/refresh', async (req, res) => {
	const refreshToken = req.header('refreshToken');

	if (refreshToken === undefined) {
		return res.status(401).json({ msg: 'Missing refreshToken' });
	}

	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		if (decoded.account_id === undefined || decoded.account_id === null) {
			return res.status(400).json({ msg: 'account_id is empty' });
		}

		const account = await pool.query(
			`SELECT refresh_token
         FROM account
        WHERE account_id = ($1)`,
			[decoded.account_id]
		);

		if (
			account.rows[0].refresh_token === undefined ||
			account.rows[0].refresh_token === null
		) {
			return res.status(401).json({ msg: 'No refresh token found in DB' });
		}

		if (account.rows[0].refresh_token !== refreshToken) {
			return res.status(401).json({ msg: 'Refresh token does not match DB' });
		}

		const newAccessToken = generateAccessToken(decoded.account_id);

		return res.status(200).json({
			account_id: decoded.account_id,
			accessToken: newAccessToken,
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
});

router.post('/test-token', authenticateToken, (req, res) => {
	return res.sendStatus(200);
});

module.exports = { authRouter: router };
