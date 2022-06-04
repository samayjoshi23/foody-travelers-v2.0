const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Controller
const users = require('../Controllers/UsersControllers')
// Schema
const auth = require('../middlewares/auth');
const isUser = require('../middlewares/isLoggedIn');
// const State = require('../Models/StateSchema');
// const Ticket = require('../Models/TicketSchema');


router.route('/login')
    .get(isUser, wrapAsync(users.loginPage))
    .post(wrapAsync(users.loginData))

router.post('/signup', isUser, wrapAsync(users.signupData));

router.get('/secret', isUser, auth, wrapAsync(users.secret));

router.route('/account')
    .get(isUser, auth, wrapAsync(users.accountPage))
    .patch(isUser, auth, wrapAsync(users.updateAccount))
    .delete(isUser, auth, wrapAsync(users.deleteAccount))

router.get('/logout', isUser, auth, wrapAsync(users.logout));

router.patch('/accountPass', isUser, auth, wrapAsync(users.updatePassword))

router.delete('/cancelTicket/:id', isUser, auth, wrapAsync(users.deleteTicket))

module.exports = router;