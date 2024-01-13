const express = require('express');
const userRegisterValidationRules = require('../validations/userRegisterValidation');
const userLoginValidationRules = require('../validations/userLoginValidation');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', userRegisterValidationRules, registerUser);
router.post('/login', userLoginValidationRules, loginUser);

module.exports = router;
