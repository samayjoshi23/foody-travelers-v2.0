const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')

// Controller Import
const admin = require('../Controllers/adminControllers');

// Middleware Import
const auth = require('../middlewares/auth');
const isUser = require('../middlewares/isLoggedIn');

router.get('/view', isUser, auth, wrapAsync(admin.getViews));


module.exports = router;