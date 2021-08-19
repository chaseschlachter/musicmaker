const express = require('express');
const router = express.Router();
const events = require('../controllers/events');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, isArtist, validateEvent } = require('../middleware');

const Event = require('../models/event');

router.route('/')
    .get(catchAsync (events.index))
    .post(isLoggedIn, validateEvent, catchAsync(events.createEvent))
/* lists events from database */

router.get('/new', isLoggedIn, events.renderNewForm)

router.route('/:id')
    .get(catchAsync(events.showEvent))
    .put(isLoggedIn, validateEvent, catchAsync(events.editEvent))
    .delete(isLoggedIn, isArtist, catchAsync(events.deleteEvent))

router.get('/:id/edit', isLoggedIn, isArtist, catchAsync(events.renderEditForm));

router.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

router.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('error');
})

module.exports = router;
