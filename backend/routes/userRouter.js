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
	saveGameScore,
	getLeaderBoard,
	deleteFriend,
} = require('../controllers/userController');
const { requireToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);

// działania na koncie użytkownika
router.get('/users/user', requireToken, getUserAccount);
router.patch('/users/user', requireToken, editUserAccount);
router.delete('/users/user', requireToken, deleteUserAccount);

// wyświetlenie listy użytkowników możliwych do dodania do znajomych
router.get('/users', requireToken, searchUsers);

// wysłanie zaproszenia do znajomych
router.patch('/users/request/friend/send', requireToken, sendFriendRequest);

// akceptacja zaproszenia do znajomych
router.patch('/users/request/friend/accept', requireToken, acceptFriendRequest);

// odrzucenie zaproszenia do znajomych
router.patch('/users/request/friend/reject', requireToken, rejectFriendRequest);

// wyświetlenie listy znajomych
router.get('/users/friends', requireToken, getUserFriends);

// wyświetlenie profilu
router.get('/users/user/:id', requireToken, getUser);

// usunięcie znajomego
router.patch('/users/friends/delete', requireToken, deleteFriend);

// wyświetlenie powiadomien
router.get('/users/notifications', requireToken, getUserNotifications);

// aktualizacja statyk i zapisanie wyniku
router.patch('/game/update', requireToken, saveGameScore);

// wyświetlenie tablicy wyników
router.get('/game/leaderboard', requireToken, getLeaderBoard);

module.exports = router;
