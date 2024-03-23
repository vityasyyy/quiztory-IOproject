const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagesSchema = new Schema({
    url: String, 
    filename: String
})
imagesSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_300')
})
const questionsSchema = new Schema({
    question: String,
    answers: [
        {
            answerText: String,
            isCorrect: Boolean,
        }
    ],
    image: [imagesSchema],
    answeredBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

module.exports = mongoose.model('Question', questionsSchema)