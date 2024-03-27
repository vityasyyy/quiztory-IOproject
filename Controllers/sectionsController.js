const Section = require('../Models/sectionSchema')
const User = require('../Models/usersSchema')
module.exports.index = async (req, res) => {
    const sections = await Section.find({})
    res.render('sections/index', {sections})
}

module.exports.sectionsShowPage = async (req, res) => {
    const {id} = req.params
    const section = await Section.findById(id).populate({
        path: 'questions'
    })
    const user = await User.findById(req.user._id)
    if(!section) {
        req.flash('error', 'Cannot find your question, Sorry :(')
        return res.redirect('/sections')
    }
    res.render('sections/show', {section, user})
}

module.exports.showScore = async(req, res) => {
    const user = await User.findById(req.user._id)
    res.render('sections/scores', {user})
}

module.exports.resetScore = async(req,res) => {
    const user = await User.findByIdAndUpdate(req.user._id, {scores: 0, answeredQuestions: [], answered: 0})
    res.redirect('/sections/scores')
}