const Event = require('../models/event');

module.exports.index = async (req, res) => {
    const events = await Event.find({});
    res.render('events/index', { events })
};

module.exports.renderNewForm = (req, res) => {
    res.render('events/new');
};

module.exports.createEvent = async(req, res) => {
        const event = new Event(req.body.event);
        event.artist = req.user._id;
        await event.save();
        req.flash('success', 'Successfully added your event!');
        res.redirect(`/events/${event._id}`)
}

module.exports.showEvent = async(req, res,) => {
    const event = await Event.findById(req.params.id).populate('artist');
    console.log(event);
    if (!event) {
        req.flash('error', 'Cannot find that Event');
        return res.redirect('/events');
    }
    res.render('events/show', { event });
}

module.exports.renderEditForm = async(req, res,) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        req.flash('error', 'Cannot find that Event');
        return res.redirect('/events');
    }
    res.render('events/edit', { event });
}

module.exports.editEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, { ...req.body.event });
    res.redirect(`/events/${event.id}`);
}

module.exports.deleteEvent = async (req, res) => {
    const{ id } = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect('/events');
}
