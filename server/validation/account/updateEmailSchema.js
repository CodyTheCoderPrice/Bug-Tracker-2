const { email, pwd } = require('./shared');

const updateEmailSchema = {
	email: email,
	pwd: pwd('Password'),
};

module.exports = updateEmailSchema;
