const { email, newPwd, first_name, last_name } = require('./shared');

const registerAccountSchema = {
	email: email,
	pwd: newPwd,
	first_name: first_name,
	last_name: last_name,
};

module.exports = registerAccountSchema;
