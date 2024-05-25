const pool = require('../db');
/**
 * Updates the refresh_token field for an account
 *
 * @param {number} account_id - Account id.
 * @param {string} refreshToken - jwtoken.
 */
async function updateRefreshTokenInDB(account_id, refreshToken) {
	try {
		await pool.query(
			`UPDATE account
			 SET refresh_token = ($1)
			 WHERE account_id = ($2)`,
			[refreshToken, account_id]
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
	updateRefreshTokenInDB,
	getAccountFromDB,
	getEverythingForAccountFromDB,
};
