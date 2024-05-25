function extractErrors(errors) {
	let extractedErrors = {};

	errors.forEach((error) => {
		extractedErrors[error.path] = extractedErrors[error.path] || [];
		extractedErrors[error.path].push(error.msg);
	});

	return extractedErrors;
}

module.exports = { extractErrors };
