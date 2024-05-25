function extractValidationErrors(errors) {
	let extractedErrors = {};

	errors.forEach((error) => {
		// Extracting only one error per field since we intend to only display one
		// ...at a time on the front end.
		if (!Object.hasOwn(extractedErrors, error.path)) {
			extractedErrors[error.path] = error.msg;
		}
	});

	return extractedErrors;
}

module.exports = { extractValidationErrors };
