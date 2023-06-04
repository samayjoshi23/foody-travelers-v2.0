const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const wrapAsync = require('../utils/wrapAsync')

// Controller
const users = require('../controllers/UsersControllers')
// Schema
const auth = require('../middlewares/auth');
const isUser = require('../middlewares/isLoggedIn');


router.route('/login')
    .get(isUser, wrapAsync(users.loginPage))
    .post([
        body('email','Enter a valid Email').exists().isEmail(),
        body('password','Password should be between 5 to 15 characters').isLength({min:5, max:15}).exists()
    ], wrapAsync(users.loginData))

router.post('/signup', isUser, [
    body('firstName','Name should be between 3 to 25 characters').isString().isLength({min:3, max:25}),
    body('lastName','Name should be between 3 to 25 characters').isString().isLength({min:3, max:25}),
    body('email','Enter a valid Email').isEmail(),
    body('phone','Enter a valid mobile number').isNumeric().isLength({min:10, max:10}),
    body('password','Enter a valid password').isLength({min: 5, max:15}),
    body('cpassword','Enter a valid password').isLength({min: 5, max:15}),
    body('pin', 'Enter a valid PIN code (6 digits)').isLength({min:6, max:6}),
    body('age', 'Age must be between 16 to 100').isNumeric()
], wrapAsync(users.signupData));

router.route('/account')
    .get(isUser, auth, wrapAsync(users.accountPage))
    .delete(isUser, auth, wrapAsync(users.deleteAccount))
    .patch(isUser, auth, [
        body('firstName','Name should be between 3 to 25 characters').isString().isLength({min:3, max:25}),
        body('lastName','Name should be between 3 to 25 characters').isString().isLength({min:3, max:25}),
        body('email','Enter a valid Email').isEmail(),
        body('phone','Enter a valid mobile number').isNumeric().isLength({min:10, max:10}),
        body('password','Enter a valid password').isLength({min: 5, max:15}),
        body('cpassword','Enter a valid password').isLength({min: 5, max:15}),
        body('pin', 'Enter a valid PIN code (6 digits)').isLength({min:6, max:6}),
        body('age', 'Age must be between 16 to 100').isNumeric()
    ], wrapAsync(users.updateAccount))

router.get('/logout', isUser, auth, wrapAsync(users.logout));

router.patch('/accountPass', isUser, auth,[
    body('oldPassword','Enter a valid password').isLength({min: 5, max:15}).withMessage('password should be between 5 to 15 characters'),
    body('newPassword','Enter a valid password').isLength({min: 5, max:15}).withMessage('password should be between 5 to 15 characters'),
    body('cNewPassword','Enter a valid password').isLength({min: 5, max:15}).withMessage('password should be between 5 to 15 characters'),
], wrapAsync(users.updatePassword))

router.delete('/cancelTicket/:id', isUser, auth, wrapAsync(users.deleteTicket))

module.exports = router;