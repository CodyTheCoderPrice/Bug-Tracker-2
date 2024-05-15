const {
	accountPasswordMinLen,
	accountPasswordMaxLen,
} = require('../constants');

const loginAccountValidationSchema = {
	email: {
		notEmpty: { errorMessage: 'Email cannot be empty' },
		isString: { errorMessage: 'Email must be a string' },
		isEmail: { errorMessage: 'Email must be valid' },
	},
	password: {
		notEmpty: { errorMessage: 'Password cannot be empty' },
		isString: { errorMessage: 'Password must be a string' },
		isLength: {
			options: { min: accountPasswordMinLen, max: accountPasswordMaxLen },
			errorMessage: `password must be ${accountPasswordMinLen}-${accountPasswordMaxLen} characters`,
		},
	},
};

module.exports = loginAccountValidationSchema;
