const {
	pwdMinLen,
	pwdMaxLen,
	nameMinLen,
	nameMaxLen,
} = require('../constants');

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

const name = {
	notEmpty: { errorMessage: 'Name cannot be empty' },
	isString: { errorMessage: 'Name must be a string' },
	isLength: {
		options: { min: nameMinLen, max: nameMaxLen * 2 },
		errorMessage: `Name must be ${nameMinLen}-${nameMaxLen * 2} characters`,
	},
};

module.exports = {
	email,
	pwd,
	pwdWithLength,
	name,
};
