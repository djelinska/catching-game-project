const express = require('express');
const { requireToken } = require('../middleware/authMiddleware');
const {
	addComment,
	getComments,
	editComment,
	deleteComment,
} = require('../controllers/commentController');

const router = express.Router();

router.post('/', requireToken, addComment);
router.get('/:id', requireToken, getComments);
router.patch('/', requireToken, editComment);
router.delete('/:id', requireToken, deleteComment);

module.exports = router;
