const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/mern', { promiseLibrary: require('bluebird')})
    .then(()=> console.log('Соединение с БД установленно'))
    .catch((err)=> console.log(`Произошла ошибка ${err}`))
const book = require('./routes/book')
var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'false'}))
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/book', book)

app.use((req,res,next)=> {
    var err = new Error('Не найдено')
    err.status = 404
    next(err)
})

app.use((err,req,res,next) =>{
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'developmant' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app