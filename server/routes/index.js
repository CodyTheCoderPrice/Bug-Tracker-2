const { Router } = require('express');
const { accountRouter } = require('./accounts');

const router = Router();

router.use(accountRouter);

module.exports = { routes: router };
