const { email, pwdWithLength, first_name, last_name } = require('./shared');

const registerAccountSchema = {
	email: email,
	pwd: pwdWithLength('Password'),
	first_name: first_name,
	last_name: last_name,
};

module.exports = registerAccountSchema;
