const pool = require('../database/db');

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
 * Determins whether a project belongs to an account.
 *
 * @param {number} account_id - Account id.
 * @param {number} project_id - Project id.
 * @returns {boolean} whether the project belongs to the account.
 */
async function doesProjectBelongToAccountInDB(account_id, project_id) {
	try {
		const projectBelongsToAccount =
			(
				await pool.query(
					`SELECT project_id
           FROM project
          WHERE project_id = $1 and account_id = $2`,
					[project_id, account_id]
				)
			).rowCount > 0;

		return projectBelongsToAccount;
	} catch (err) {
		throw err;
	}
}

/**
 * Determins whether a bug belongs to an account.
 *
 * @param {number} account_id - Account id.
 * @param {number} bug_id - Bug id.
 * @returns {boolean} whether the bug belongs to the account.
 */
async function doesBugBelongToAccountInDB(account_id, bug_id) {
	try {
		const bugBelongsToAccount =
			(
				await pool.query(
					`WITH p AS (
						SELECT project_id FROM project WHERE account_id = $1
					)
					SELECT bug_id
			  		FROM bug
					 WHERE bug_id = $2 and project_id IN (SELECT project_id FROM p)`,
					[account_id, bug_id]
				)
			).rowCount > 0;

		return bugBelongsToAccount;
	} catch (err) {
		throw err;
	}
}

/**
 * Determins whether a comment belongs to an account.
 *
 * @param {number} account_id - Account id.
 * @param {number} comment_id - Comment id.
 * @returns {boolean} whether the comment belongs to the account.
 */
async function doesCommentBelongToAccountInDB(account_id, comment_id) {
	try {
		const commentBelongsToAccount =
			(
				await pool.query(
					`WITH b AS (
						SELECT bug_id FROM bug WHERE project_id IN (
							SELECT project_id FROM project WHERE account_id = $1)
						)
					SELECT comment_id
			  		FROM comment
					 WHERE comment_id = $2 and bug_id IN (SELECT bug_id FROM b)`,
					[account_id, comment_id]
				)
			).rowCount > 0;

		return commentBelongsToAccount;
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
			 WHERE account_id = $1
			 ORDER BY project_id`,
			[account_id]
		);
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieves all bugs from database for a specific account.
 *
 * @param {number} account_id - Account id.
 * @returns {{
 *  bug_id: number,
 * 	project_id: number,
 * 	name: string,
 * 	description: string,
 * 	priority_id: number,
 * 	priority_name: string,
 * 	status_id: number,
 * 	status_name: string,
 * 	create_time: Date,
 * 	due_date: Date,
 * 	complete_date: date,
 * 	update_time: Date
 * }[]} Returns an array of bug objects.
 */
async function getBugsFromDB(account_id) {
	try {
		return await pool.query(
			`WITH b AS
				(SELECT * FROM bug WHERE project_id IN
					(SELECT project_id FROM project WHERE account_id = $1)
				)
			SELECT b.bug_id, b.project_id, b.name, b.description,
				b.priority_id, b.status_id, b.create_time, b.due_date,
				b.complete_date, b.update_time,
				p.name AS priority_name, s.name AS status_name
			  FROM b, priority p, status s
			 WHERE (b.priority_id = p.priority_id) AND (b.status_id = s.status_id)
			 ORDER BY b.bug_id`,
			[account_id]
		);
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieves all comments from database for a specific account.
 *
 * @param {number} account_id - Account id.
 * @returns {{
 *  comment_id: number,
 * 	bug_id: number,
 * 	description: string,
 * 	create_time: Date,
 * 	update_time: Date
 * }[]} Returns an array of comment objects.
 */
async function getCommentsFromDB(account_id) {
	try {
		return await pool.query(
			`WITH c AS
			 (SELECT * FROM comment WHERE bug_id IN
				(SELECT bug_id FROM bug WHERE project_id IN
					(SELECT project_id FROM project WHERE account_id = $1)
				)
			 )
			 SELECT *
		     FROM c
			  ORDER BY c.comment_id`,
			[account_id]
		);
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieves account table info (excluding password) from database for a
 * specific user. Along with all projects, bugs, and comments for their account.
 *
 * @param {number} account_id - Account id.
 * @returns {{
 * 	account: {
 * 	account_id: number,
 * 	email: string,
 * 	first_name: string,
 * 	last_name: string,
 * 	create_time: Date,
 * 	update_time: Date
 * },
 * projects: {
 * 	project_id: number,
 * 	account_id: number,
 * 	name: string,
 * 	description: string,
 * 	create_time: Date,
 * 	update_time: Date
 * }[],
 * bugs: {
 *  bug_id: number,
 * 	project_id: number,
 * 	name: string,
 * 	description: string,
 * 	priority_id: number,
 * 	priority_name: string,
 * 	status_id: number,
 * 	status_name: string,
 * 	create_time: Date,
 * 	due_date: Date,
 * 	complete_date: date,
 * 	update_time: Date
 * }[],
 * comments: {
 *  comment_id: number,
 * 	bug_id: number,
 * 	description: string,
 * 	create_time: Date,
 * 	update_time: Date
 * }[]
 * }} - Object containing account info, projects, bugs, and comments.
 */
async function getEverythingForAccountFromDB(account_id) {
	try {
		const account = await getAccountFromDB(account_id);
		const projects = await getProjectsFromDB(account_id);
		const bugs = await getBugsFromDB(account_id);
		const comments = await getCommentsFromDB(account_id);

		return {
			account: account.rows[0],
			projects: projects,
			bugs: bugs,
			comments: comments,
		};
	} catch (err) {
		throw err;
	}
}

module.exports = {
	removeRefreshTokenInDB,
	replaceRefreshTokenInDB,
	doesProjectBelongToAccountInDB,
	doesBugBelongToAccountInDB,
	doesCommentBelongToAccountInDB,
	getAccountFromDB,
	getProjectsFromDB,
	getBugsFromDB,
	getCommentsFromDB,
	getEverythingForAccountFromDB,
};
