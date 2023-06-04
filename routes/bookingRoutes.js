const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Controller Import
const tour = require('../Controllers/bookingControllers');

// Middleware Import
const auth = require('../middlewares/auth');
const isUser = require('../middlewares/isLoggedIn');


router.get('/states', isUser, wrapAsync(tour.getStates));

router.get('/states/:id/booking', isUser, auth, wrapAsync(tour.bookingPage));

router.get('/states/:id', isUser, wrapAsync(tour.showState));

router.post('/states/:id/booking', isUser, auth, wrapAsync(tour.detailsPage));

router.get('/states/:id/booking/ticket', isUser, auth, wrapAsync(tour.ticketPage));

router.get('/states/:id/booking/ticket/payment', isUser, auth, wrapAsync(tour.paymentPage));

router.post('/ticket', isUser, auth, wrapAsync(tour.generateTicket));


module.exports = router;