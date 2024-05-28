const { email, currentPwd } = require('./shared');

const updateEmailSchema = {
	email: email,
	pwd: currentPwd,
};

module.exports = updateEmailSchema;
