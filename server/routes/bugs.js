const { Router } = require('express');
const { matchedData, checkSchema } = require('express-validator');
const {
	schemaErrorHandler,
} = require('../middleware/errors/schemaErrorHandler.js');
const {
	authenticateToken,
} = require('../middleware/auth/authenticateToken.js');
const pool = require('../db');
const {
	getBugsFromDB,
	doesProjectBelongToAccountInDB,
} = require('../utils/queries.js');
const createBugSchema = require('../middleware/validation/bugs/createBugSchema.js');

const router = Router();

//============
// Create Bug
//============
router.post(
	'/create',
	authenticateToken,
	[checkSchema(createBugSchema), schemaErrorHandler],
	async (req, res) => {
		const data = matchedData(req);
		const {
			project_id,
			name,
			description,
			location,
			priority_id,
			status_id,
			due_date,
			complete_date,
		} = data;

		// Declared in authenticateToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			console.log('res.locals missing account_id');
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		try {
			const belongs = await doesProjectBelongToAccountInDB(
				account_id,
				project_id
			);
			if (!belongs) {
				return res.status(400).json({
					errors: { project_id: 'Project ID does not belong to account' },
				});
			}
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}

		try {
			const createdBug = await pool.query(
				`INSERT INTO bug (project_id, name, description, location, priority_id,
                          status_id, due_date, complete_date)
						  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING bug_id`,
				[
					project_id,
					name,
					description,
					location,
					priority_id,
					status_id,
					due_date,
					complete_date,
				]
			);

			if (createdBug.rowCount === 0) {
				throw new Error('Database failed to create bug');
			}

			const bugs = await getBugsFromDB(account_id);

			if (bugs == null) {
				console.log('getBugsFromDB returned without bugs');
				return res.status(500).json({ errors: { server: 'Server error' } });
			}

			return res.status(200).json({ bugs: bugs.rows });
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}
	}
);

module.exports = { bugsRouter: router };
