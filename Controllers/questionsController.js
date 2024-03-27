const User = require('../Models/usersSchema')

module.exports.postAnswer = async (req, res) => {
    const {id} = req.params
    const userAnswer = req.body.questions.answers
    if(!userAnswer) {
        req.flash('error', "Please make a choice first")
        res.redirect(`/sections/${id}`)
    } else {
        const questionId = req.body.questions.question
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
                req.flash('success', "Thanks for answering")
        } else {
            const user = await User.findByIdAndUpdate(
                req.user._id,
                {$inc: {answered: 1}},
                {new: true});
                req.flash('success', "Thanks for answering")
        }
        res.redirect(`/sections/${id}`)
    }
}
