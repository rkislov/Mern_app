const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = require('../models/Book')

router.get('/', (req,res,next) => {
    Book.find((err, books) => {
        if (err) return next(err)
        res.json(books)
    })
})

router.get('/:id', (req, res, next) => {
    Book.findById(req.params.id, (err, book)=>{
        if (err) return next(err)
        res.json(book)
    })
})

router.post('/', (req,res,next)=>{
    Book.create(req.body, (err, book) => {
        if (err) return next (err)
        res.json(book)
    })
})

router.put('/:id', function(req, res, next) {
    Book.findByIdAndUpdate(req.params.id, req.body, function (err, book) {
        if (err) return next(err);
        res.json(book);
    });
});


router.delete('/:id', function(req, res, next) {
    Book.findByIdAndRemove(req.params.id, req.body, function (err, book) {
        if (err) return next(err);
        res.json(book);
    });
});



module.exports = router