const { Router } = require('express');
const { authRouter } = require('./auth.routes.js');
const { accountRouter } = require('./account.routes.js');
const { projectsRouter } = require('./project.routes.js');
const { bugsRouter } = require('./bug.routes.js');

const router = Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/accounts', accountRouter);
router.use('/api/v1/projects', projectsRouter);
router.use('/api/v1/bugs', bugsRouter);

module.exports = { routes: router };
