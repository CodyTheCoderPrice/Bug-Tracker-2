const { Router } = require('express');
const { matchedData, checkSchema } = require('express-validator');
const {
	handleSchemaErrors,
} = require('../middleware/validation/handleSchemaErrors.js');
const {
	authenticateToken,
} = require('../middleware/auth/authenticateToken.js');
const pool = require('../db');
const createProjectSchema = require('../middleware/validation/projects/createProjectSchema.js');
const { getProjectsFromDB } = require('../utils/queries.js');

const router = Router();

//================
// Create project
//================
router.post(
	'/create',
	authenticateToken,
	[checkSchema(createProjectSchema), handleSchemaErrors],
	async (req, res) => {
		const data = matchedData(req);
		const { name, description } = data;

		// Declared in authenticateToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			console.log('res.locals missing account_id');
			return res.status(500).json({ errors: { server: 'Server error' } });
		}

		try {
			const createdProject = await pool.query(
				`INSERT INTO project (account_id, name, description)
						VALUES($1, $2, $3)
            RETURNING project_id`,
				[account_id, name, description]
			);

			if (createdProject.rowCount === 0) {
				throw new Error('Database failed to create project');
			}

			const projects = await getProjectsFromDB(account_id);

			if (projects == null) {
				console.log('getProjectsFromDB returned without projects');
				return res.status(500).json({ errors: { server: 'Server error' } });
			}

			return res.status(200).json({ projects: projects.rows });
		} catch (err) {
			console.log(err.message);
			return res.status(503).json({ errors: { server: 'Server error' } });
		}
	}
);

module.exports = { projectsRouter: router };
