const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// router.post('/signUp', authValidators.validateUserSignUp, authController.signUpUser);
// router.post('/logIn', authValidators.validateUserLogIn, authController.logInUser);


router.post('/signUp',  authController.signUpUser);
router.post('/logIn', authController.logInUser);

module.exports = router;
