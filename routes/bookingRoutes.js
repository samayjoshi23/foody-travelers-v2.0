const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Controller Import
const tour = require('../Controllers/bookingControllers');

// Middleware Import
const auth = require('../middlewares/auth');


router.get('/states', wrapAsync(tour.getStates));

router.get('/states/:id/booking', auth, wrapAsync(tour.bookingPage));

router.get('/states/:id', wrapAsync(tour.showState));

router.post('/states/:id/booking', auth, wrapAsync(tour.detailsPage));

router.get('/states/:id/booking/ticket', auth, wrapAsync(tour.ticketPage));

router.get('/states/:id/booking/ticket/payment', auth, wrapAsync(tour.paymentPage));

router.post('/ticket', auth, wrapAsync(tour.generateTicket));


module.exports = router;