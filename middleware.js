const { eventSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Event = require('./models/event');


module.exports.isLoggedIn = (req, res, next) => {
    console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
            req.session.returnTo = req.originalUrl
            req.flash('error', 'you must be signed in first!');
            return res.redirect('/login');
    }
    next();
}

module.exports.validateEvent = (req, res, next) => {
    const { error } = eventSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isArtist = async (req, res, next) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event.artist.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/events/${id}`);
    }
    next();
}
