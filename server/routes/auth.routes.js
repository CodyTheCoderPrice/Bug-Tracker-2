const { Router } = require('express');
const { checkSchema } = require('express-validator');
const {
	schemaErrorHandler,
} = require('../middleware/errors/schemaErrorHandler.middleware.js');
const loginSchema = require('../validation/account/loginScema.js');
const { authToken } = require('../middleware/auth/authToken.middleware.js');
const authController = require('../controllers/auth.controllers.js');

const router = Router();

router.post(
	'/login',
	[checkSchema(loginSchema), schemaErrorHandler],
	authController.login
);

router.get('/relogin', authToken, authController.relogin);

router.delete('/logout', authToken, authController.logout);

router.post('/refresh', authController.refreshTokens);

router.post('/test-token', authToken, (req, res) => {
	return res.status(200).json({ msg: 'Token authenticated' });
});

module.exports = { authRouter: router };
