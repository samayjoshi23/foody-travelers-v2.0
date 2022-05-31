const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Controller
const users = require('../Controllers/UsersControllers')
// Schema
const auth = require('../middlewares/auth');
// const State = require('../Models/StateSchema');
// const Ticket = require('../Models/TicketSchema');


router.route('/login')
    .get(wrapAsync(users.loginPage))
    .post(wrapAsync(users.loginData))

router.post('/signup', wrapAsync(users.signupData));

router.get('/secret', auth, wrapAsync(users.secret));

router.get('/logout', auth, wrapAsync(users.logout));

router.get('/account', auth, wrapAsync(users.account));


module.exports = router;