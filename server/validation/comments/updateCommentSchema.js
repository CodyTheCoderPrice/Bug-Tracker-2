const { bug_id } = require('../shared');
const { comment_id, description } = require('./shared');

const updateCommentSchema = {
	comment_id: comment_id,
	bug_id: bug_id,
	description: description,
};

module.exports = updateCommentSchema;
