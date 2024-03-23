const storeReturnTo = (req, res, next) => {
    if(req.res.returnTo) {
        res.locals.returnTo = req.session.returnTo
    }
    next()
}

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', "Sign up first")
        return res.redirect('/register')
    }
    next()
}

module.exports = {storeReturnTo, isLoggedIn}