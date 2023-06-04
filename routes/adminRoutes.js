const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Controller Import
const admin = require('../controllers/adminControllers');

// Middleware Import
const auth = require('../middlewares/auth');
const isUser = require('../middlewares/isLoggedIn');

router.get('/dashboard', isUser, auth, wrapAsync(admin.dashboard));

router.get('/users', isUser, auth, wrapAsync(admin.getUsers));

router.get('/tickets', isUser, auth, wrapAsync(admin.getTickets));

router.get('/states', isUser, auth, wrapAsync(admin.getStates));

router.delete('/removeticket/:id', isUser, auth, wrapAsync(admin.deleteTicketAdmin));

router.delete('/removeuser/:id', isUser, auth, wrapAsync(admin.deleteUserAdmin));

router.patch('/updateuser/:id', isUser, auth, wrapAsync(admin.updateUser));

router.get('/states/newState', isUser, auth, wrapAsync(admin.createState));


module.exports = router;