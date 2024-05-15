const registerAccountValidationSchema = {
	email: {
		notEmpty: { errorMessage: 'Email cannot be empty' },
		isString: { errorMessage: 'Email must be a string' },
		isEmail: { errorMessage: 'Email must be valid' },
	},
	password: {
		notEmpty: { errorMessage: 'Password cannot be empty' },
		isString: { errorMessage: 'Password must be a string' },
		isLength: {
			options: { min: 6, max: 30 },
			errorMessage: 'password must be 6-30 characters',
		},
	},
	first_name: {
		notEmpty: { errorMessage: 'First name cannot be empty' },
		isString: { errorMessage: 'First name must be a string' },
		isLength: {
			options: { min: 1, max: 35 },
			errorMessage: 'First name must be 1-35 characters',
		},
	},
	last_name: {
		notEmpty: { errorMessage: 'Last name cannot be empty' },
		isString: { errorMessage: 'Last name must be a string' },
		isLength: {
			options: { min: 1, max: 35 },
			errorMessage: 'Last name must be 1-35 characters',
		},
	},
};

module.exports = registerAccountValidationSchema;
