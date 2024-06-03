const { email, pwd } = require('./shared');

const loginSchema = {
	email: email,
	pwd: pwd('Password'),
};

module.exports = loginSchema;
