const { Router } = require('express');
const { matchedData, checkSchema } = require('express-validator');
const {
	handleSchemaErrors,
} = require('../middleware/validation/handleSchemaErrors.js');
const {
	authenticateToken,
} = require('../middleware/auth/authenticateToken.js');
const pool = require('../db');
const {
	getProjectsFromDB,
	doesProjectBelongToAccountInDB,
} = require('../utils/queries.js');
const createProjectSchema = require('../middleware/validation/projects/createProjectSchema.js');
const updateProjectSchema = require('../middleware/validation/projects/updateProjectSchema.js');
const deleteProjectSchema = require('../middleware/validation/projects/deleteProjectSchema.js');

const router = Router();

//================
// Create Project
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
						  VALUES ($1, $2, $3)
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

//================
// Update Project
//================
router.post(
	'/update',
	authenticateToken,
	[checkSchema(updateProjectSchema), handleSchemaErrors],
	async (req, res) => {
		const data = matchedData(req);
		const { project_id, name, description } = data;

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
			const updatedProject = await pool.query(
				`UPDATE project
				    SET name = $1, description = $2
				  WHERE account_id = $3 AND project_id = $4
				 RETURNING project_id`,
				[name, description, account_id, project_id]
			);

			if (updatedProject.rowCount === 0) {
				throw new Error('Database failed to update project');
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

//================
// Delete Project
//================
router.delete(
	'/delete',
	authenticateToken,
	[checkSchema(deleteProjectSchema), handleSchemaErrors],
	async (req, res) => {
		const data = matchedData(req);
		const { project_id } = data;

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
			const deletedProject = await pool.query(
				`DELETE FROM project
				  WHERE account_id = $1 AND project_id = $2`,
				[account_id, project_id]
			);

			if (deletedProject.rowCount === 0) {
				throw new Error('Database failed to delete project');
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
