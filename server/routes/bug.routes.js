const { Router } = require('express');
const { checkSchema } = require('express-validator');
const {
	schemaErrorHandler,
} = require('../middleware/errors/schemaErrorHandler.middleware.js');
const { authToken } = require('../middleware/auth/authToken.middleware.js');
const createBugSchema = require('../validation/bugs/createBugSchema.js');
const bugController = require('../controllers/bug.controllers.js');

const router = Router();

//============
// Create Bug
//============
router.post('/create', authToken, [
	checkSchema(createBugSchema),
	schemaErrorHandler,
	bugController.createBug,
]);

module.exports = { bugsRouter: router };
