require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
	const accessToken = req.header('accessToken');

	if (accessToken === undefined) {
		return res.status(401).send({ success: false, msg: 'Missing accessToken' });
	}

	try {
		const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		req.account_id = payload.account_id;
		next();
	} catch (err) {
		return res.status(403).json({ success: false, msg: err });
	}
}

module.exports = { authenticateToken: authenticateToken };
