const express = require('express');
const { requireToken } = require('../middleware/authMiddleware');
const {
	addChallenge,
	getChallenge,
	acceptChallengeRequest,
	rejectChallengeRequest,
} = require('../controllers/challengeController');

const router = express.Router();

router.post('/', requireToken, addChallenge);
router.get('/:id', requireToken, getChallenge);
router.patch('/request/accept', requireToken, acceptChallengeRequest);
router.patch('/request/reject', requireToken, rejectChallengeRequest);

module.exports = router;
