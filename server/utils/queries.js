const pool = require('../db');

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
async function getAccount(account_id) {
	try {
		return await await pool.query(
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
async function getEverythingForAccount(account_id) {
	try {
		const account = await getAccount(account_id);

		// TODO: Retrieve everthing (projects, bugs, comments, etc.)

		return {
			account: account.rows[0],
			test1: 'test',
			test2: 123,
		};
	} catch (err) {
		throw err;
	}
}

module.exports = {
	getAccount,
	getEverythingForAccount,
};
