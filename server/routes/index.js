const { Router } = require('express');
const { authRouter } = require('./auth.js');
const { accountRouter } = require('./accounts.js');
const { projectsRouter } = require('./projects.js');

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/accounts', accountRouter);
router.use('/api/v1/projects', projectsRouter);

module.exports = { routes: router };
