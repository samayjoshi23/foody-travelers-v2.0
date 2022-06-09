const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Schema Import
const State = require('../Models/StateSchema');
const Ticket = require('../Models/TicketSchema');
const User = require('../Models/UserSchema');

// Middleware Import
const auth = require('../middlewares/auth');
const isUser = require('../middlewares/isLoggedIn');

// Controller Inport
const admin = require('../Controllers/adminController');

router.get('/view', isUser, auth, wrapAsync(admin.getViews));



module.exports = router;