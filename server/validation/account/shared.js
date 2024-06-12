const {
	nameMinLen,
	nameMaxLen,
	pwdMinLen,
	pwdMaxLen,
} = require('../constants');

const first_name = {
	notEmpty: { errorMessage: 'First name cannot be empty' },
	isString: { errorMessage: 'First name must be a string' },
	isLength: {
		options: { min: nameMinLen, max: nameMaxLen },
		errorMessage: `First name must be ${nameMinLen}-${nameMaxLen} characters`,
	},
};

const last_name = {
	notEmpty: { errorMessage: 'Last name cannot be empty' },
	isString: { errorMessage: 'Last name must be a string' },
	isLength: {
		options: { min: nameMinLen, max: nameMaxLen },
		errorMessage: `Last name must be ${nameMinLen}-${nameMaxLen} characters`,
	},
};

const email = {
	notEmpty: { errorMessage: 'Email cannot be empty' },
	isString: { errorMessage: 'Email must be a string' },
	isEmail: { errorMessage: 'Email must be valid' },
};

const pwd = (pwdTitle) => ({
	notEmpty: { errorMessage: `${pwdTitle} cannot be empty` },
	isString: { errorMessage: `${pwdTitle} must be a string` },
});

const pwdWithLength = (pwdTitle) => ({
	notEmpty: { errorMessage: `${pwdTitle} cannot be empty` },
	isString: { errorMessage: `${pwdTitle} must be a string` },
	isLength: {
		options: { min: pwdMinLen, max: pwdMaxLen },
		errorMessage: `${pwdTitle} must be ${pwdMinLen}-${pwdMaxLen} characters`,
	},
});

module.exports = {
	first_name,
	last_name,
	email,
	pwd,
	pwdWithLength,
};
