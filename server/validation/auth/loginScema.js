const { accountPwdMinLen, accountPwdMaxLen } = require('../constants');

const loginAccountValidationSchema = {
	email: {
		notEmpty: { errorMessage: 'Email cannot be empty' },
		isString: { errorMessage: 'Email must be a string' },
		isEmail: { errorMessage: 'Email must be valid' },
	},
	pwd: {
		notEmpty: { errorMessage: 'Password cannot be empty' },
		isString: { errorMessage: 'Password must be a string' },
		isLength: {
			options: { min: accountPwdMinLen, max: accountPwdMaxLen },
			errorMessage: `password must be ${accountPwdMinLen}-${accountPwdMaxLen} characters`,
		},
	},
};

module.exports = loginAccountValidationSchema;
