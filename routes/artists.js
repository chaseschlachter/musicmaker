const express = require('express');
const router = express.Router();
const passport = require('passport');
const Artist = require('../models/artist');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

/* lists artists from database */
router.get('/', async (req, res) => {
    const artists = await Artist.find({});
    res.render('artists/index', { artists })
});

router.get('/new', (req, res) => {
    res.render('artists/new');
});

//~ below was moved to app.js page ~//
///router.get('/login', (req, res) => {
///res.render('artists/login');
///})

/* shows specific artists that exist in database */
/* link - show.ejs */
router.get('/:id', catchAsync(async(req, res,) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
        req.flash('error', 'Cannot find that Artist');
        return res.redirect('/artists');
    }
    res.render('artists/show', { artist });
}));

/* artist edits form*/
router.get('/:id/edit', catchAsync(async (req, res) => {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
        req.flash('error', 'Cannot find that Artist');
        return res.redirect('/artists');
    }
    res.render('artists/edit', { artist }); 
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const artist = await Artist.findByIdAndUpdate(id, { ...req.body.artist });
    res.redirect(`/artists/${artist._id}`);
}))

/* creating a new artist */
router.post('/new', catchAsync(async(req, res) => {
    try {
        const { email, username, password, location, genre, about, size } = req.body;
        const artist = new Artist({ email, username, location, genre, about, size });
        const registeredUser = await Artist.register(artist, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Success, welcome to MacroTickets!');
            res.redirect(`/artists/${artist._id}`)
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('new');
    }
}));

/** Where I'm encountering my error **/
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) =>{
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/artists';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

/* delete a post */
router.delete('/:id', catchAsync(async (req, res) => {
    const{ id } = req.params;
    await Artist.findByIdAndDelete(id);
    res.redirect('/artists');
}))


//router.all('*', (req, res, next) => {
//    next(new ExpressError('Page Not Found', 404))
//})

//router.use((err, req, res, next) => {
//    const { statusCode = 500, message = 'Something went wrong' } = err;
//    res.status(statusCode).render('error');
//})

module.exports = router;
