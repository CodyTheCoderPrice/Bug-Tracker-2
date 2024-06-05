const { bug_id } = require('../shared');
const { description } = require('./shared');

const createCommentSchema = {
	bug_id: bug_id,
	description: description,
};

module.exports = createCommentSchema;
