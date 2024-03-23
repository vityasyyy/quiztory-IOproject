const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Question = require('./questionsSchema')

const imagesSchema = new Schema({
    url: String, 
    filename: String
})
imagesSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_300')
})
const sectionsSchema = new Schema({
    title: String,
    description: String,
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    images: [imagesSchema]
})

module.exports = mongoose.model('Section', sectionsSchema)