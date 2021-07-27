const express = require('express');
const router = express.Router();
const Venue = require('../models/venue');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');


/* lists venues from database */
router.get('/', async (req, res) => {
    const venues = await Venue.find({});
    res.render('venues/index', { venues })
});

/* send wrong url searches to the new page (has to be below the lead page above)*/
router.get('/new', (req, res) => {
    res.render('venues/new');
});

/* creating a new venue */
/* link - database.. last line sends you to updated/created page from form */
router.post('/', catchAsync(async(req, res) => {
    const venue = new Venue(req.body.venue);
    await venue.save();
    req.flash('success', 'Successfully submitted a new Venue');
    res.redirect(`/venues/${venue._id}`)
}));

/* looks up thing we're editing so we can pre-populate the form with information */
/* link - edit.ejs */
router.get('/:id/edit', catchAsync(async (req, res) => {
    const venue = await Venue.findById(req.params.id)
    res.render('venues/edit', { venue }); 
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const venue = await Venue.findByIdAndUpdate(id, { ...req.body.venue });
    res.redirect(`/venues/${venue._id}`);
}))

/* delete a post */
router.delete('/:id', catchAsync(async (req, res) => {
    const{ id } = req.params;
    await Venue.findByIdAndDelete(id);
    res.redirect('/venues');
}))

/* shows specific venues that exist in database */
/* link - show.ejs */
router.get('/:id', catchAsync(async(req, res,) => {
    const venue = await Venue.findById(req.params.id)
    res.render('venues/show', { venue });
}));

router.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

router.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('error');
})

module.exports = router;
