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
const {
	updateRefreshTokenInDB,
	getEverythingForAccountFromDB,
} = require('../utils/queries.js');
const {
	generateAccessToken,
	generateRefreshToken,
	authenticateToken,
} = require('../utils/jwt.js');
const { extractValidationErrors } = require('../utils/errorHandling.js');

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
			return res
				.status(400)
				.json({ errors: extractValidationErrors(result.array()) });
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
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}

		if (idAndHashPass.rowCount === 0) {
			return res.status(401).json({ errors: { email: 'Email unregistered' } });
		}

		const correctpwd = bcrypt.compareSync(pwd, idAndHashPass.rows[0].hash_pass);

		if (!correctpwd) {
			return res.status(403).json({ errors: { pwd: 'Incorrect password' } });
		}

		let account;
		try {
			({ account, placeholder1, placeholder2 } =
				await getEverythingForAccountFromDB(idAndHashPass.rows[0].account_id));
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}

		if (account.account_id == null) {
			console.log(err.message);
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		let accessToken, refreshToken;
		try {
			accessToken = generateAccessToken(account.account_id);
			refreshToken = generateRefreshToken(account.account_id);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		try {
			await updateRefreshTokenInDB(account.account_id, refreshToken);
		} catch (err) {
			console.log(err.message);
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		res.cookie('token', accessToken, {
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
		});
		res.cookie('refreshToken', refreshToken, {
			secure: true,
			httpOnly: true,
			path: ['/api/v1/auth/refresh', '/api/v1/auth/logout'],
			sameSite: 'strict',
		});

		return res.json({
			account: account,
		});
	}
);

//========
// Logout
//========
router.post('/logout', authenticateToken, async (req, res) => {
	const account_id = res.locals.account_id;
	try {
		res.clearCookie('token');
		res.clearCookie('refreshToken', {
			path: ['/api/v1/auth/refresh', '/api/v1/auth/logout'],
		});
		await updateRefreshTokenInDB(account_id, '');
	} catch (err) {
		console.log(err.message);
		return res.status(503).json({ errors: { server: 'Server error' } });
	}

	return res.status(200).json({ msg: 'Logout successful' });
});

//===============
// Refresh Token
//===============
router.post('/refresh', async (req, res) => {
	if (req.cookies.refreshToken == null) {
		return res.status(401).json({ errors: { token: 'Missing refresh token' } });
	}

	const refreshToken = req.cookies.refreshToken;

	let decoded;
	try {
		decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
	} catch (err) {
		if (err.message === 'jwt expired') {
			return res
				.status(400)
				.json({ errors: { token: 'Refresh token expired' } });
		}
		return res.status(403).json({ errors: { token: 'Invalid refresh token' } });
	}

	if (decoded.account_id == null) {
		return res.status(403).json({ errors: { token: 'Invalid refresh token' } });
	}

	let account;
	try {
		account = await pool.query(
			`SELECT refresh_token
         FROM account
        WHERE account_id = ($1)`,
			[decoded.account_id]
		);
	} catch (err) {
		console.log(err.message);
		return res.status(503).json({ errors: { server: 'Server error' } });
	}

	if (account.rows[0].refresh_token == null) {
		return res
			.status(401)
			.json({ errors: { token: 'No refresh token found in DB' } });
	}

	if (account.rows[0].refresh_token !== refreshToken) {
		return res
			.status(401)
			.json({ errors: { token: 'Refresh token does not match DB' } });
	}

	let newAccessToken, newRefreshToken;
	try {
		newAccessToken = generateAccessToken(decoded.account_id);
		newRefreshToken = generateRefreshToken(decoded.account_id);
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ errors: { server: 'Server error' } });
	}

	try {
		await updateRefreshTokenInDB(decoded.account_id, newRefreshToken);
	} catch (err) {
		console.log(err.message);
		return res.status(503).json({ errors: { server: 'Server error' } });
	}

	res.cookie('token', newAccessToken, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
	});
	res.cookie('refreshToken', newRefreshToken, {
		secure: true,
		httpOnly: true,
		path: '/api/v1/auth/refresh',
		sameSite: 'strict',
	});

	return res.status(200).json({ msg: 'Tokens refreshed' });
});

//============
// Test Token
//============
router.post('/test-token', authenticateToken, (req, res) => {
	return res.status(200).json({ msg: 'Token authenticated' });
});

module.exports = { authRouter: router };
