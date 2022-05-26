const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Controller
const users = require('../Controllers/UsersControllers')
// Schema
const fetchUser = require('../middlewares/getUser');
// const State = require('../Models/StateSchema');
// const Ticket = require('../Models/TicketSchema');


router.route('/login')
    .get(wrapAsync(users.loginPage))
    .post(wrapAsync(users.loginData))

router.post('/signup', wrapAsync(users.signupData));

router.post('/getuser',fetchUser, wrapAsync(users.getUsers));

module.exports = router;