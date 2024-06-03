const { nameMinLen, nameMaxLen, descriptionMaxLen } = require('../constants');

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
		options: { max: descriptionMaxLen },
		errorMessage: `Description is too long (${descriptionMaxLen} character limit)`,
	},
};

module.exports = {
	name,
	description,
};
