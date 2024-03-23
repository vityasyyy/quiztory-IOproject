const Question = require('../Models/questionsSchema')
const Section = require('../Models/sectionSchema')
const User = require('../Models/usersSchema')

module.exports.postAnswer = async (req, res) => {
    const {id} = req.params
    const userAnswer = req.body.questions.answers
    const questionId = req.body.questions.question
    const body = req.body
    console.log(body)
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {$addToSet: {answeredQuestions: questionId}},
        {new: true}
    )
    if(userAnswer === "true") {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {$inc: {scores: 1, answered: 1}},
            {new: true});
        console.log(user)
        req.flash('success', "Your answer is correct")
    } else {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {$inc: {answered: 1}},
            {new: true});
        console.log(user)
        req.flash('error', "Sorry, your answer is incorrect, try again yaa")
    }
    res.redirect(`/sections/${id}`)
}
