const {
	accountPwdMinLen,
	accountPwdMaxLen,
	accountNameMinLen,
	accountNameMaxLen,
} = require('../constants');

const email = {
	notEmpty: { errorMessage: 'Email cannot be empty' },
	isString: { errorMessage: 'Email must be a string' },
	isEmail: { errorMessage: 'Email must be valid' },
};

const pwd = {
	notEmpty: { errorMessage: 'Password cannot be empty' },
	isString: { errorMessage: 'Password must be a string' },
	isLength: {
		options: { min: accountPwdMinLen, max: accountPwdMaxLen },
		errorMessage: `password must be ${accountPwdMinLen}-${accountPwdMaxLen} characters`,
	},
};

const first_name = {
	notEmpty: { errorMessage: 'First name cannot be empty' },
	isString: { errorMessage: 'First name must be a string' },
	isLength: {
		options: { min: accountNameMinLen, max: accountNameMaxLen },
		errorMessage: `First name must be ${accountNameMinLen}-${accountNameMaxLen} characters`,
	},
};

const last_name = {
	notEmpty: { errorMessage: 'Last name cannot be empty' },
	isString: { errorMessage: 'Last name must be a string' },
	isLength: {
		options: { min: accountNameMinLen, max: accountNameMaxLen },
		errorMessage: `Last name must be ${accountNameMinLen}-${accountNameMaxLen} characters`,
	},
};

module.exports = { email, pwd, first_name, last_name };
