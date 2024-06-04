const { bug_id, project_id } = require('../shared');
const {
	name,
	description,
	location,
	priority_id,
	status_id,
	due_date,
	complete_date,
} = require('./shared');

const updateBugSchema = {
	bug_id: bug_id,
	project_id: project_id,
	name: name,
	description: description,
	location: location,
	priority_id: priority_id,
	status_id: status_id,
	due_date: due_date,
	complete_date: complete_date,
};

module.exports = updateBugSchema;
