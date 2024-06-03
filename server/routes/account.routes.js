const { Router } = require('express');
const { checkSchema } = require('express-validator');
const {
	schemaErrorHandler,
} = require('../middleware/errors/schemaErrorHandler.middleware.js');
const registerAccountSchema = require('../validation/account/registerSchema.js');
const updateEmailSchema = require('../validation/account/updateEmailSchema.js');
const updatePasswordSchema = require('../validation/account/updatePasswordSchema.js');
const updateNameSchema = require('../validation/account/updateNameSchema.js');
const deleteAccountSchema = require('../validation/account/deleteAccountSchema.js');
const { authToken } = require('../middleware/auth/authToken.middleware.js');
const {
	authPassword,
} = require('../middleware/auth/authPassword.middleware.js');
const {
	confirmPwdMatches,
} = require('../middleware/auth/confirmPwdMatches.middleware.js');
const accountController = require('../controllers/account.controllers.js');

const router = Router();

router.post('/register', [
	checkSchema(registerAccountSchema),
	schemaErrorHandler,
	accountController.registerAccount,
]);

router.post('/update-name', authToken, [
	checkSchema(updateNameSchema),
	schemaErrorHandler,
	accountController.updateAccountName,
]);

router.post(
	'/update-email',
	authToken,
	[checkSchema(updateEmailSchema), schemaErrorHandler],
	authPassword,
	accountController.updateAccountEmail
);

router.post(
	'/update-password',
	authToken,
	[checkSchema(updatePasswordSchema), schemaErrorHandler],
	confirmPwdMatches,
	authPassword,
	accountController.updateAccountPassword
);

router.delete(
	'/delete',
	authToken,
	[checkSchema(deleteAccountSchema), schemaErrorHandler],
	authPassword,
	accountController.deleteAccount
);

module.exports = { accountRouter: router };
