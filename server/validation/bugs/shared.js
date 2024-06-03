const { nameMinLen, nameMaxLen, descriptionMaxLen } = require('../constants');

const name = {
	notEmpty: { errorMessage: 'Bug name cannot be empty' },
	isString: { errorMessage: 'Bug name must be a string' },
	isLength: {
		options: { min: nameMinLen, max: nameMaxLen },
		errorMessage: `Bug name must be ${nameMinLen}-${nameMaxLen} characters`,
	},
};

const description = {
	isString: { errorMessage: 'Description must be a string' },
	isLength: {
		options: { max: descriptionMaxLen },
		errorMessage: `Description is too long (${descriptionMaxLen} character limit)`,
	},
};

const location = {
	isString: { errorMessage: 'Location must be a string' },
	isLength: {
		options: { max: 100 },
		errorMessage: 'Location is too long (100 character limit)',
	},
};

const priority_id = {
	notEmpty: { errorMessage: 'Priority ID cannot be empty' },
	isInt: {
		options: { min: 1, max: 3 },
		errorMessage: 'Priority ID must be an integer between 1-3',
	},
};

const status_id = {
	notEmpty: { errorMessage: 'Status ID cannot be empty' },
	isInt: {
		options: { min: 1, max: 4 },
		errorMessage: 'Status ID must be an integer between 1-4',
	},
};

const due_date = {
	optional: { options: { nullable: true } },
	isDate: {
		errorMessage: 'Due date must be a date object',
	},
};

const complete_date = {
	optional: { options: { nullable: true } },
	isDate: {
		errorMessage: 'Completion date must be a date object',
	},
};

module.exports = {
	name,
	description,
	location,
	priority_id,
	status_id,
	due_date,
	complete_date,
};
