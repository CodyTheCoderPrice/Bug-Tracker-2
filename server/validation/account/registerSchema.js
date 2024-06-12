const { first_name, last_name, email, pwdWithLength } = require('./shared');

const registerAccountSchema = {
	first_name: first_name,
	last_name: last_name,
	email: email,
	pwd: pwdWithLength('Password'),
};

module.exports = registerAccountSchema;
