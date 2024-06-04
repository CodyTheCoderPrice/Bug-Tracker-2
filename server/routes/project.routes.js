const { Router } = require('express');
const { checkSchema } = require('express-validator');
const {
	schemaErrorHandler,
} = require('../middleware/errors/schemaErrorHandler.middleware.js');
const { authToken } = require('../middleware/auth/authToken.middleware.js');
const createProjectSchema = require('../validation/projects/createProjectSchema.js');
const updateProjectSchema = require('../validation/projects/updateProjectSchema.js');
const deleteProjectSchema = require('../validation/projects/deleteProjectSchema.js');
const projectController = require('../controllers/project.controllers.js');

const router = Router();

router.post(
	'/create',
	authToken,
	[checkSchema(createProjectSchema), schemaErrorHandler],
	projectController.createProject
);

router.put(
	'/update',
	authToken,
	[checkSchema(updateProjectSchema), schemaErrorHandler],
	projectController.updateProject
);

router.delete(
	'/delete',
	authToken,
	[checkSchema(deleteProjectSchema), schemaErrorHandler],
	projectController.deleteProject
);

module.exports = { projectsRouter: router };
