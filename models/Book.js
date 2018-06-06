const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    description: String,
    author: String,
    published_date: {type: Date},
    publisher: String,
    update_date: {type: Date, default: Date.now }
})

module.exports = mongoose.model('Book', BookSchema)