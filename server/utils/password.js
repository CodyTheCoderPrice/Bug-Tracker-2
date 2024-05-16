const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Hashes a password.
 *
 * @param {string} password - Password to be hashed.
 * @returns {string} Returns hashed password.
 */
module.exports.hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(password, salt);
};

/**
 * Checks whether a plain text password matches a hashed password.
 *
 * @param {string} plain - Plain text password.
 * @param {string} hashed - Hashed password.
 * @returns {boolean} Returns whether the passwords match.
 */
module.exports.comparePassword = (plain, hashed) => {
	return bcrypt.compareSync(plain, hashed);
};
