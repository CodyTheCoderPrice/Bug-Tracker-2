const { email, pwdWithLength, name } = require('./shared');

const registerAccountSchema = {
	email: email,
	pwd: pwdWithLength('Password'),
	name: name,
};

module.exports = registerAccountSchema;
