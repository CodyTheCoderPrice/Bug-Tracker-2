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

//================
// Create Project
//================
router.post('/create', authToken, [
	checkSchema(createProjectSchema),
	schemaErrorHandler,
	projectController.createProject,
]);

//================
// Update Project
//================
router.post('/update', authToken, [
	checkSchema(updateProjectSchema),
	schemaErrorHandler,
	projectController.updateProject,
]);

//================
// Delete Project
//================
router.delete('/delete', authToken, [
	checkSchema(deleteProjectSchema),
	schemaErrorHandler,
	projectController.deleteProject,
]);

module.exports = { projectsRouter: router };
