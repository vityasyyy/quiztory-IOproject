const express = require('express')
const router = express.Router({mergeParams: true})
const sections = require('../Controllers/sectionsController')
const asyncWrap = require('../Middleware/AsyncWrap')
const {isLoggedIn} = require('../Middleware/validator')
router.route('/')
    .get(asyncWrap(sections.index))

router.route('/scores')
    .get(isLoggedIn, asyncWrap(sections.showScore))
    .post(isLoggedIn, asyncWrap(sections.resetScore))

router.route('/:id')
    .get(isLoggedIn, asyncWrap(sections.sectionsShowPage))

    
module.exports = router