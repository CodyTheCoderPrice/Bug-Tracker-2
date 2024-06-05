const { Router } = require('express');
const { checkSchema } = require('express-validator');
const {
	schemaErrorHandler,
} = require('../middleware/errors/schemaErrorHandler.middleware.js');
const { authToken } = require('../middleware/auth/authToken.middleware.js');
const createCommentSchema = require('../validation/comments/createCommentSchema.js');
//const updateBugSchema = require('../validation/bugs/updateBugSchema.js');
//const deleteBugSchema = require('../validation/bugs/deleteBugSchema.js');
const commentController = require('../controllers/comment.controller.js');
const updateCommentSchema = require('../validation/comments/updateCommentSchema.js');
const deleteCommentSchema = require('../validation/comments/deleteCommentSchema.js');

const router = Router();

router.post(
	'/create',
	authToken,
	[checkSchema(createCommentSchema), schemaErrorHandler],
	commentController.createComment
);

router.put(
	'/update',
	authToken,
	[checkSchema(updateCommentSchema), schemaErrorHandler],
	commentController.updateComment
);

router.delete(
	'/delete',
	authToken,
	[checkSchema(deleteCommentSchema), schemaErrorHandler],
	commentController.deleteComment
);

module.exports = { commentsRouter: router };
