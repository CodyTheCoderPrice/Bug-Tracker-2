const { Router } = require('express');
const { accountRouter } = require('./accounts');

const router = Router();

router.use('/api/v1/account', accountRouter);

module.exports = { routes: router };
