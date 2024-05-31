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
 * 	create_time: Date,
 * 	update_time: Date
 * }} Returns object with account info.
 */
async function getAccountFromDB(account_id) {
	try {
		return await pool.query(
			`SELECT account_id, email, first_name, last_name, create_time, update_time
				 FROM account
				WHERE account_id = $1`,
			[account_id]
		);
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieves all projects from database for a specific account.
 *
 * @param {number} account_id - Account id.
 * @returns {{
 * 	project_id: number,
 * 	account_id: number,
 * 	name: string,
 * 	description: string,
 * 	create_time: Date,
 * 	update_time: Date
 * }[]} Returns an array of project objects.
 */
async function getProjectsFromDB(account_id) {
	try {
		return await pool.query(
			`SELECT project_id, account_id, name, description, create_time, update_time
				FROM project
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
		const projects = await getProjectsFromDB(account_id);
		// TODO: Retrieve everthing (projects, bugs, comments, etc.)

		return {
			account: account.rows[0],
			projects: projects,
		};
	} catch (err) {
		throw err;
	}
}

module.exports = {
	removeRefreshTokenInDB,
	replaceRefreshTokenInDB,
	getAccountFromDB,
	getProjectsFromDB,
	getEverythingForAccountFromDB,
};
