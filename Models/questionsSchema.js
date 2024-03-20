const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionsSchema = new Schema({
    question: String,
    answers: [
        {
            answerText: String,
            isCorrect: Boolean
        }
    ]
})

module.exports = mongoose.model('Question', questionsSchema)