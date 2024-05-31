const { project_id, name, description } = require('./shared');

const updateProjectSchema = {
	project_id: project_id,
	name: name,
	description: description,
};

module.exports = updateProjectSchema;
