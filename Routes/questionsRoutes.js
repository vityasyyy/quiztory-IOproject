const express = require('express')
const router = express.Router({mergeParams: true})
const questions = require('../Controllers/questionsController')
const asyncWrap = require('../Middleware/AsyncWrap')

router.route('/')
    .post(asyncWrap(questions.postAnswer))
module.exports = router