const { matchedData } = require('express-validator');
const pool = require('../database/db.js');
const {
	doesBugBelongToAccountInDB,
	getCommentsFromDB,
} = require('../utils/queries.js');
const { CustomError } = require('../utils/classes.js');

/**
 * Controller to create a comment in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema and schemaErrorHandler.
 */
const createComment = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { bug_id, description } = data;

		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const bugBelongs = await doesBugBelongToAccountInDB(account_id, bug_id);

		if (!bugBelongs) {
			throw new CustomError('Bug ID does not belong to account', 403, {
				errors: { bug_id: 'Bug ID does not belong to account' },
			});
		}

		const createdComment = await pool.query(
			`INSERT INTO comment (bug_id, description)
            VALUES ($1, $2)
         RETURNING bug_id`,
			[bug_id, description]
		);

		if (createdComment.rowCount === 0) {
			throw new Error('Database failed to create comment');
		}

		const comments = await getCommentsFromDB(account_id);

		if (comments == null) {
			throw new Error('getBugsFromDB returned without comments array');
		}

		return res.status(200).json({ comments: comments.rows });
	} catch (err) {
		err.message = `create-bug: ${err.message}`;
		next(err);
	}
};

module.exports = { createComment };
