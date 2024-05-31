const { name, description } = require('./shared');

const updateProjectSchema = {
	project_id: {
		notEmpty: { errorMessage: 'Project_id cannot be empty' },
		isNumeric: { errorMessage: 'Project_id must be a number' },
	},
	name: name,
	description: description,
};

module.exports = updateProjectSchema;
