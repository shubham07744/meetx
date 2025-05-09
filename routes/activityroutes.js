const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware')
const {getActivities,createActivity,bookActivity, getBookings } = require('../controller/activitycontroller')

router.post('/create',authmiddleware, createActivity);
router.get('/', getActivities);
router.post('/book', authmiddleware, bookActivity);
router.get('/bookings', authmiddleware, getBookings);


module.exports = router;