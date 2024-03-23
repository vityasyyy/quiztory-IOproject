require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const flash = require('connect-flash')
const ejsMate = require('ejs-mate')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const LocalStrategy = require('passport-local')
const passport = require('passport')

const ExpressError = require('./Middleware/ExpressError')

const User = require('./Models/usersSchema')

const sectionsRoutes = require('./Routes/sectionsRoutes')
const questionsRoutes = require('./Routes/questionsRoutes')
const usersRoutes = require('./Routes/usersRoutes')

const app = express()

const dbURL = process.env.DBURL
const urlParser = {userNewURLParser: true}
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/quiztory')
    .then(() => {
        console.log("MONGO CONNECTED!!");
    })
    .catch((err) => {
        console.log("MONGO ERROR OCCURED");
        console.log(err); 
    })

const secret = process.env.SECRET

const store = MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret,
    }
})
store.on('error', function(e) {
    console.log('Session store error', e)
})
const sessionConfig = {
    secret,
    resave: false,
    saveUninitialized: false,
    cookies: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.engine('ejs', ejsMate)
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'Public')))

app.use((req,res,next) => {
    res.locals.signedInUser = req.user; 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', usersRoutes)
app.use('/sections', sectionsRoutes)
app.use('/sections/:id/question', questionsRoutes)

app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})
app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if(!err.message) err.message = "Something is wrong"
    res.status(statusCode).render('error', {err})
})
app.listen(3000, () => {
    console.log("Listening from port 3000")
})

module.exports = app