const jwt = require('jsonwebtoken');
const { CustomError } = require('../../utils/classes');

/**
 * Middleware to authenticate an accessToken.
 */
async function authToken(req, res, next) {
	try {
		if (req.cookies.token == null) {
			throw new CustomError('Missing access token', 401, {
				needRefresh: true,
				errors: { token: 'Missing access token' },
			});
		}

		accessToken = req.cookies.token;

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			res.locals.account_id = decoded.account_id;
			next();
		} catch (err) {
			if (err.message === 'jwt expired') {
				throw new CustomError('Access token expired', 400, {
					needRefresh: true,
					errors: { token: 'Access token expired' },
				});
			}
			throw new CustomError('Invalid access token', 403, {
				needRefresh: true,
				errors: { token: 'Invalid access token' },
			});
		}
	} catch (err) {
		err.message = `authToken: ${err.message}`;
		next(err);
	}
}

module.exports = {
	authToken,
};
