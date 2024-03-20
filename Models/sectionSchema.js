const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Question = require('./questionsSchema')

const sectionsSchema = new Schema({
    title: String,
    description: String,
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
})

module.exports = mongoose.model('Section', sectionsSchema)