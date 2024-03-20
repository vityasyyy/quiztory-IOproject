const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')

const ExpressError = require('./Middleware/ExpressError')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/quiztory')
    .then(() => {
        console.log("MONGO CONNECTED!!");
    })
    .catch((err) => {
        console.log("MONGO ERROR OCCURED");
        console.log(err); 
    })

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.send("HALLOOO")
})

app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})
app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if(!err.message) err.message = "Something is wrong"
    res.status(statusCode).render('error', {err})
})
app.listen(3000, () => {
    console.log("Listening from port 3000")
})

module.exports = app