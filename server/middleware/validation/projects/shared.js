const { nameMinLen, nameMaxLen } = require('../constants');

const project_id = {
	notEmpty: { errorMessage: 'Project_id cannot be empty' },
	isInt: { errorMessage: 'Project_id must be a number' },
};

const name = {
	notEmpty: { errorMessage: 'Project name cannot be empty' },
	isString: { errorMessage: 'Project name must be a string' },
	isLength: {
		options: { min: nameMinLen, max: nameMaxLen },
		errorMessage: `Project name must be ${nameMinLen}-${nameMaxLen} characters`,
	},
};

const description = {
	isString: { errorMessage: 'Description must be a string' },
	isLength: {
		options: { max: 500 },
		errorMessage: 'Description is too long (500 character limit).',
	},
};

module.exports = {
	project_id,
	name,
	description,
};
