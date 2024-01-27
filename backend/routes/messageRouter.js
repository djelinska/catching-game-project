const express = require('express');
const { requireToken } = require('../middleware/authMiddleware');
const {
	addMessage,
	getMessages,
	editMessage,
	deleteMessage,
} = require('../controllers/messageController');

const router = express.Router();

router.post('/', requireToken, addMessage);
router.get('/:id', requireToken, getMessages);
router.patch('/', requireToken, editMessage);
router.delete('/:id', requireToken, deleteMessage);

module.exports = router;
