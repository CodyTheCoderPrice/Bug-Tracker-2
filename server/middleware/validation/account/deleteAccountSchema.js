const { pwd } = require('./shared');

const deleteAccountSchema = {
	pwd: pwd('Password'),
};

module.exports = deleteAccountSchema;
