const { pwd, pwdWithLength } = require('./shared');

const updatePasswordSchema = {
	pwd: pwd('Current password'),
	newPwd: pwdWithLength('New password'),
	confirmPwd: pwd('Confirmation password'),
};

module.exports = updatePasswordSchema;
