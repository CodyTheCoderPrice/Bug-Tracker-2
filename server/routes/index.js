const { Router } = require('express');
const { accountRouter } = require('./accounts.js');
const { authRouter } = require('./auth.js');

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/account', accountRouter);

module.exports = { routes: router };
