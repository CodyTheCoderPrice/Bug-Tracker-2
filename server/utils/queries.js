const pool = require('../db');

/**
 * Remove the refresh_token for an account from the database
 *
 * @param {number} account_id - Account id.
 */
async function removeRefreshTokenInDB(account_id) {
	try {
		await pool.query(
			`DELETE FROM token
			 WHERE account_id = ($1)`,
			[account_id]
		);
	} catch (err) {
		throw err;
	}
}

/**
 * Replaces the refresh_token for an account in the database
 *
 * @param {number} account_id - Account id.
 * @param {string} refreshToken - jwtoken.
 */
async function replaceRefreshTokenInDB(account_id, refreshToken) {
	try {
		removeRefreshTokenInDB(account_id);

		await pool.query(
			`INSERT INTO token (account_id, refresh_token)
			 VALUES ($1, $2)`,
			[account_id, refreshToken]
		);
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieves account table info (excluding password) from database for a
 * specific user.
 *
 * @param {number} account_id - Account id.
 * @returns {{
 * 	account_id: number,
 * 	email: string,
 * 	first_name: string,
 * 	last_name: string,
 * 	join_date: Date,
 * 	last_edited: Date
 * }} Returns Object with account info.
 */
async function getAccountFromDB(account_id) {
	try {
		return await pool.query(
			`SELECT account_id, email, first_name, last_name, join_date, last_edited
				 FROM account
				WHERE account_id = $1`,
			[account_id]
		);
	} catch (err) {
		throw err;
	}
}

/**
 * TODO: Finish doc
 *
 * @param {*} account_id
 * @returns
 */
async function getEverythingForAccountFromDB(account_id) {
	try {
		const account = await getAccountFromDB(account_id);

		// TODO: Retrieve everthing (projects, bugs, comments, etc.)

		return {
			account: account.rows[0],
			placeholder1: 'test',
			placeholder2: 123,
		};
	} catch (err) {
		throw err;
	}
}

module.exports = {
	removeRefreshTokenInDB,
	replaceRefreshTokenInDB,
	getAccountFromDB,
	getEverythingForAccountFromDB,
};
