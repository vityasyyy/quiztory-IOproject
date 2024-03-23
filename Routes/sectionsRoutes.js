const express = require('express')
const router = express.Router({mergeParams: true})
const sections = require('../Controllers/sectionsController')
const asyncWrap = require('../Middleware/AsyncWrap')
const {isLoggedIn} = require('../Middleware/validator')
router.route('/')
    .get(asyncWrap(sections.index))

router.route('/scores')
    .get(asyncWrap(sections.showScore))

router.route('/:id')
    .get(isLoggedIn, asyncWrap(sections.sectionsShowPage))

    
module.exports = router