const { matchedData } = require('express-validator');
const pool = require('../database/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	removeRefreshTokenInDB,
	replaceRefreshTokenInDB,
	getEverythingForAccountFromDB,
} = require('../utils/queries.js');
const {
	generateAccessToken,
	generateRefreshToken,
} = require('../utils/jwt.js');
const { CustomError } = require('../utils/classes.js');

/**
 * Controller to login an account.
 *
 * NOTE: Intended to run after checkSchema and schemaErrorHandler.
 */
const login = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { email, pwd } = data;

		const idAndHashPass = await pool.query(
			`SELECT account_id, hash_pass
         FROM account
        WHERE LOWER(email) = LOWER($1)`,
			[email]
		);

		if (idAndHashPass.rowCount === 0) {
			throw new CustomError('Email unregistered', 401, {
				errors: { email: 'Email unregistered' },
			});
		}

		const correctpwd = bcrypt.compareSync(pwd, idAndHashPass.rows[0].hash_pass);

		if (!correctpwd) {
			throw new CustomError('Incorrect password', 403, {
				errors: { pwd: 'Incorrect password' },
			});
		}

		const { account, projects, bugs } = await getEverythingForAccountFromDB(
			idAndHashPass.rows[0].account_id
		);

		if (account.account_id == null) {
			throw new Error(
				'getEverythingForAccountFromDB returned without account_id'
			);
		}

		if (projects == null) {
			throw new Error(
				'getEverythingForAccountFromDB returned without projects array'
			);
		}

		if (bugs == null) {
			throw new Error(
				'getEverythingForAccountFromDB returned without bugs array'
			);
		}

		const accessToken = generateAccessToken(account.account_id);
		const refreshToken = generateRefreshToken(account.account_id);

		await replaceRefreshTokenInDB(account.account_id, refreshToken);

		res.cookie('token', accessToken, {
			secure: true,
			httpOnly: true,
			sameSite: 'strict',
		});
		res.cookie('refreshToken', refreshToken, {
			secure: true,
			httpOnly: true,
			path: '/api/v1/auth/refresh',
			sameSite: 'strict',
		});

		return res.status(200).json({
			account: account,
			projects: projects.rows,
			bugs: bugs.rows,
		});
	} catch (err) {
		err.message = `login: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to re-login an account.
 *
 * NOTE: Intended to run after authToken.
 */
const relogin = async (req, res, next) => {
	try {
		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const { account, projects, bugs } = await getEverythingForAccountFromDB(
			account_id
		);

		if (account.account_id == null) {
			throw new Error(
				'getEverythingForAccountFromDB returned without account_id'
			);
		}

		if (projects == null) {
			throw new Error(
				'getEverythingForAccountFromDB returned without projects array'
			);
		}

		if (bugs == null) {
			throw new Error(
				'getEverythingForAccountFromDB returned without bugs array'
			);
		}

		return res.status(200).json({
			account: account,
			projects: projects.rows,
			bugs: bugs.rows,
		});
	} catch (err) {
		err.message = `relogin: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to logout an account.
 *
 * NOTE: Intended to run after authToken.
 */
const logout = async (req, res, next) => {
	try {
		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		res.clearCookie('token', { sameSite: 'strict' });
		res.clearCookie('refreshToken', {
			path: '/api/v1/auth/refresh',
			sameSite: 'strict',
		});

		await removeRefreshTokenInDB(account_id);

		return res.status(200).json({ msg: 'Logout successful' });
	} catch (err) {
		err.message = `logout: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to refresh the access and refresh tokens.
 */
const refreshTokens = async (req, res, next) => {
	try {
		if (req.cookies.refreshToken == null) {
			throw new CustomError('Missing refresh token', 401, {
				errors: { token: 'Missing refresh token' },
			});
		}

		const refreshToken = req.cookies.refreshToken;

		let decoded;
		try {
			decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		} catch (err) {
			if (err.message === 'jwt expired') {
				throw new CustomError('Refresh token expired', 400, {
					errors: { token: 'Refresh token expired' },
				});
			}
			throw new CustomError('Invalid refresh token', 403, {
				errors: { token: 'Invalid refresh token' },
			});
		}

		if (decoded.account_id == null) {
			throw new CustomError('Invalid refresh token', 403, {
				errors: { token: 'Invalid refresh token' },
			});
		}

		const dbToken = await pool.query(
			`SELECT refresh_token
				 FROM token
			  WHERE account_id = ($1)`,
			[decoded.account_id]
		);

		if (dbToken.rowCount === 0 || dbToken.rows[0].refresh_token == null) {
			throw new CustomError('No refresh token found in DB', 401, {
				errors: { token: 'No refresh token found in DB' },
			});
		}

		if (dbToken.rows[0].refresh_token !== refreshToken) {
			throw new CustomError('Refresh token does not match DB', 403, {
				errors: { token: 'Refresh token does not match DB' },
			});
		}

		const newAccessToken = generateAccessToken(decoded.account_id);
		const newRefreshToken = generateRefreshToken(decoded.account_id);

		await replaceRefreshTokenInDB(decoded.account_id, newRefreshToken);

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

		return res.status(200).json({ msg: 'Token refresh successful' });
	} catch (err) {
		err.message = `refresh-token: ${err.message}`;
		next(err);
	}
};

module.exports = {
	login,
	relogin,
	logout,
	refreshTokens,
};
