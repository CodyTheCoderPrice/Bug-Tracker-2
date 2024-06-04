const { Router } = require('express');
const { checkSchema } = require('express-validator');
const {
	schemaErrorHandler,
} = require('../middleware/errors/schemaErrorHandler.middleware.js');
const { authToken } = require('../middleware/auth/authToken.middleware.js');
const createBugSchema = require('../validation/bugs/createBugSchema.js');
const updateBugSchema = require('../validation/bugs/updateBugSchema.js');
const bugController = require('../controllers/bug.controllers.js');
const deleteBugSchema = require('../validation/bugs/deleteBugSchema.js');

const router = Router();

router.post(
	'/create',
	authToken,
	[checkSchema(createBugSchema), schemaErrorHandler],
	bugController.createBug
);

router.put(
	'/update',
	authToken,
	[checkSchema(updateBugSchema), schemaErrorHandler],
	bugController.updateBug
);

router.delete(
	'/delete',
	authToken,
	[checkSchema(deleteBugSchema), schemaErrorHandler],
	bugController.deleteBug
);

module.exports = { bugsRouter: router };
