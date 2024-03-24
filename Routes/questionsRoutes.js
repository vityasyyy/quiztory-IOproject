const express = require('express')
const router = express.Router({mergeParams: true})
const questions = require('../Controllers/questionsController')
const asyncWrap = require('../Middleware/AsyncWrap')
const {isLoggedIn} = require('../Middleware/validator')
router.route('/')
    .post(isLoggedIn, asyncWrap(questions.postAnswer))
module.exports = router