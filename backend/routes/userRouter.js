const express = require('express');
const {
	registerUser,
	loginUser,
	getUserAccount,
	editUserAccount,
	deleteUserAccount,
	searchUsers,
	getUser,
	getUserFriends,
	getUserNotifications,
	sendFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
	getUserTotalScore,
	saveGameScore,
	getLeaderBoard,
	deleteFriend,
} = require('../controllers/userController');
const { requireToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// konto użytkownika
router.get('/account', requireToken, getUserAccount);
router.patch('/account', requireToken, editUserAccount);
router.delete('/account', requireToken, deleteUserAccount);

router.get('/search', requireToken, searchUsers);

// obsługa znajomych
router.get('/friends', requireToken, getUserFriends);
router.patch('/friends/request/send', requireToken, sendFriendRequest);
router.patch('/friends/request/accept', requireToken, acceptFriendRequest);
router.patch('/friends/request/reject', requireToken, rejectFriendRequest);
router.patch('/friends/delete', requireToken, deleteFriend);

// profil użytkownika
router.get('/profile/:username', requireToken, getUser);

// powiadomienia
router.get('/notifications', requireToken, getUserNotifications);

// aktualizacje wyników
router.get('/game/totalscore', requireToken, getUserTotalScore);
router.patch('/game/update', requireToken, saveGameScore);

// tablica wyników
router.get('/game/leaderboard', requireToken, getLeaderBoard);

module.exports = router;
