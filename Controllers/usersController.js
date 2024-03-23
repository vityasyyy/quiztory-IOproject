const express = require('express')
const router = express.Router({mergeParams: true})
const passport = require('passport')

const User = require('../Models/usersSchema')

const asyncWrap = require('../Middleware/AsyncWrap')
const {storeReturnTo} = require('../Middleware/validator')

module.exports.registerForm = (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async(req, res) => {
    try{
        const {email, username, password} = req.body
        const scores = 0
        const user = new User({email, username, scores})
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if(err) return next(err)
            req.flash('success', `Welcome to our quiz app, ${registeredUser.username}!!!`)
            res.redirect('/sections')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.loginForm = (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    req.flash('success', "Welcome back!!")
    const redirectUrl = req.session.returnTo || '/sections'
    delete req.session.returnTo
    res.redirect('/sections')
}

module.exports.logoutUser = (req, res) => {
    req.logout(function (err) {
        if(err) {
            return next(err)
        }
    })
    req.flash('success', "Thanks for trying quiztory!!")
    res.redirect('/sections')
}