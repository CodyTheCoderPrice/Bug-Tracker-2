const { matchedData } = require('express-validator');
const pool = require('../database/db.js');
const {
	getProjectsFromDB,
	getIsProjectBelongingToAccountInDB,
	getBugsFromDB,
	getCommentsFromDB,
} = require('../utils/queries.js');
const { CustomError } = require('../utils/classes.js');

/**
 * Controller to create a project in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema and schemaErrorHandler.
 */
const createProject = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { name, description } = data;

		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

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
			throw new Error('getProjectsFromDB returned without projects array');
		}

		return res.status(200).json({ projects: projects.rows });
	} catch (err) {
		err.message = `create-project: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to update a project in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema and schemaErrorHandler.
 */
const updateProject = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { project_id, name, description } = data;

		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const isProjectBelongingToAccount =
			await getIsProjectBelongingToAccountInDB(account_id, project_id);

		if (!isProjectBelongingToAccount) {
			throw new CustomError('Project ID does not belong to account', 403, {
				errors: { project_id: 'Project ID does not belong to account' },
			});
		}

		const updatedProject = await pool.query(
			`UPDATE project
          SET name = $1, description = $2
        WHERE project_id = $3
       RETURNING project_id`,
			[name, description, project_id]
		);

		if (updatedProject.rowCount === 0) {
			throw new Error('Database failed to update project');
		}

		const projects = await getProjectsFromDB(account_id);

		if (projects == null) {
			throw new Error('getProjectsFromDB returned without projects');
		}

		return res.status(200).json({ projects: projects.rows });
	} catch (err) {
		err.message = `update-project: ${err.message}`;
		next(err);
	}
};

/**
 * Controller to delete a project in the DB.
 *
 * NOTE: Intended to run after authToken, checkSchema and schemaErrorHandler.
 */
const deleteProject = async (req, res, next) => {
	try {
		const data = matchedData(req);
		const { project_id } = data;

		// Declared in authToken middleware
		const account_id = res.locals.account_id;

		if (account_id == null) {
			throw new Error('res.locals missing account_id');
		}

		const isProjectBelongingToAccount =
			await getIsProjectBelongingToAccountInDB(account_id, project_id);

		if (!isProjectBelongingToAccount) {
			throw new CustomError('Project ID does not belong to account', 403, {
				errors: { project_id: 'Project ID does not belong to account' },
			});
		}

		const deletedProject = await pool.query(
			`DELETE FROM project
        WHERE project_id = $1`,
			[project_id]
		);

		if (deletedProject.rowCount === 0) {
			throw new Error('Database failed to delete project');
		}

		const projects = await getProjectsFromDB(account_id);
		const bugs = await getBugsFromDB(account_id);
		const comments = await getCommentsFromDB(account_id);

		if (projects == null) {
			throw new Error('getProjectsFromDB returned without projects');
		}

		if (bugs == null) {
			throw new Error('getBugsFromDB returned without bugs array');
		}

		if (comments == null) {
			throw new Error('getCommentsFromDB returned without comments array');
		}

		return res.status(200).json({
			projects: projects.rows,
			bugs: bugs.rows,
			comments: comments.rows,
		});
	} catch (err) {
		err.message = `delete-project: ${err.message}`;
		next(err);
	}
};

module.exports = { createProject, updateProject, deleteProject };
