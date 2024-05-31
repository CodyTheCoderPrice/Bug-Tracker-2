const { nameMinLen, nameMaxLen } = require('../constants');

const name = {
	notEmpty: { errorMessage: 'Project name cannot be empty' },
	isString: { errorMessage: 'Project name must be a string' },
	isLength: {
		options: { min: nameMinLen, max: nameMaxLen },
		errorMessage: `Project name must be ${nameMinLen}-${nameMaxLen} characters`,
	},
};

const description = {
	isString: { errorMessage: 'Project name must be a string' },
	isLength: {
		options: { max: 500 },
		errorMessage: 'Description is too long (500 character limit).',
	},
};

module.exports = {
	name,
	description,
};
