const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.get('/signin', (req, res) => {
    res.render('users/signin');
})

router.post('/register', catchAsync(async(req, res) => {
    try {
        const { email, username, password, year_born, phone } = req.body;
        const user = new User({ email, username, year_born, phone });
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to MacroTickets!');
        res.redirect('/artists');
    } catch (e) {
        req.flash('error', 'Sorry, a user with that email already exists');
        res.redirect('/register');
    }
}));


router.post('/signin', passport.authenticate('local', { failureFlash: true, failureRedirect: '/signin' }), (req, res) =>{
    req.flash('success', 'Welcome back!');
    res.redirect('/artists');
})

module.exports = router;  
