const { Router } = require('express');
const { authRouter } = require('./auth.js');
const { accountRouter } = require('./accounts.js');
const { projectsRouter } = require('./projects.js');
const { bugsRouter } = require('./bugs.js');

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/accounts', accountRouter);
router.use('/api/v1/projects', projectsRouter);
router.use('/api/v1/bugs', bugsRouter);

module.exports = { routes: router };
