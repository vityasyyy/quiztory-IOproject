const express = require('express')
const router = express.Router({mergeParams: true})
const passport = require('passport')

const asyncWrap = require('../Middleware/AsyncWrap')
const {storeReturnTo} = require('../Middleware/validator')

const users = require('../Controllers/usersController')

router.route('/register')
    .get(users.registerForm)
    .post(asyncWrap(users.registerUser))

router.route('/login')
    .get(users.loginForm)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser)

router.get('/logout', users.logoutUser)

module.exports = router