const project_id = {
	notEmpty: { errorMessage: 'Project ID cannot be empty' },
	isInt: { errorMessage: 'Project ID must be an integer' },
};

const bug_id = {
	notEmpty: { errorMessage: 'Bug ID cannot be empty' },
	isInt: { errorMessage: 'Bug ID must be an integer' },
};

module.exports = {
	project_id,
	bug_id,
};
