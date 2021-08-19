const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const Artist = require('./models/artist');
const Event = require('./models/event');
const User = require('./models/user');
const flash = require('connect-flash');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
//const venueRoutes = require('./routes/venues');
const artistRoutes = require('./routes/artists');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/macro-tickets';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

/* method override allows to serve put requests into the database */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(Artist.authenticate()));

//passport.serializeUser(User.serializeUser());
passport.serializeUser(Artist.serializeUser());
//passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(Artist.deserializeUser());


app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/login', (req, res) => {
    res.render('artists/login');
})

app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/artists');
})

app.use('/artists', artistRoutes)
app.use('/events', eventRoutes)
app.use('/users', userRoutes)



app.listen(3000, () => {
    console.log('Serving on port 3000')
})
