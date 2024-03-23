const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    scores: Number,
    answered: Number,
    answeredQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Question"
        }
    ]
})

usersSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', usersSchema)