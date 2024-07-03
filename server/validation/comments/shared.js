const { descriptionMaxLen } = require('../constants');

const comment_id = {
	notEmpty: { errorMessage: 'Comment ID cannot be empty' },
	isInt: { errorMessage: 'Comment ID must be an integer' },
};

const description = {
	notEmpty: { errorMessage: 'Description cannot be empty' },
	isString: { errorMessage: 'Description must be a string' },
	isLength: {
		options: { max: descriptionMaxLen },
		errorMessage: `Description is too long (${descriptionMaxLen} character limit)`,
	},
};

module.exports = {
	comment_id,
	description,
};
