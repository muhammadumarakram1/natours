const express = require('express');
const { isLoggedIn, protect } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', isLoggedIn, createBookingCheckout, viewController.getOverview);
router.get('/tour/:slug', isLoggedIn, viewController.getTour);
router.get('/login', isLoggedIn, viewController.getLoginForm);
router.get('/me', protect, viewController.getAccountDetails);
router.get('/my-tours', protect, viewController.getMyTours);

module.exports = router;
