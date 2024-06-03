const { project_id } = require('../shared');
const { name, description } = require('./shared');

const updateProjectSchema = {
	project_id: project_id,
	name: name,
	description: description,
};

module.exports = updateProjectSchema;
