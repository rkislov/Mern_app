const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Book = require('../models/Book')
const passport = require('passport')
require('../config/passport')(passport)

router.get('/', passport.authenticate('jwt', {session:false}), (req,res) => {
    const token = getToken(req.headers)
    if(token) {
        Book.find((err, books) => {
            if (err) return next(err)
            res.json(books)
        })
    } else {
        return res.status(403).send({success: false, msg: 'Нет авторизации'})
    }
})

router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const token = getToken(req.headers)
    if(token) {
         Book.findById(req.params.id, (err, book)=>{
        if (err) return next(err)
        res.json(book)
        })
    } else {
        return res.status(403).send({success: false, msg: 'Нет авторизации'})
    }
})

router.post('/', passport.authenticate('jwt', {session:false}), (req,res)=>{
    const token = getToken(req.headers)
    if(token) {
        Book.create(req.body, (err, book) => {
        if (err) return next (err)
        res.json(book)
        })
    } else {
        return res.status(403).send({success: false, msg: 'Нет авторизации'})
    }
})

router.put('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {

    const token = getToken(req.headers)
    if(token) {
        Book.findByIdAndUpdate(req.params.id, req.body, function (err, book) {
        if (err) return next(err)
        res.json(book)
     })
    } else {
        return res.status(403).send({success: false, msg: 'Нет авторизации'})
    }
})


router.delete('/:id', passport.authenticate('jwt', {session:false}), function(req, res) {

    const token = getToken(req.headers)
    if(token) {
        Book.findByIdAndRemove(req.params.id, req.body, function (err, book) {
        if (err) return next(err)
        res.json(book)
        })
    } else {
        return res.status(403).send({success: false, msg: 'Нет авторизации'})
    }
})

getToken = (headers) => {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ')
        if(parted.length == 2) {
            return parted[1]
        } else {
            return null
        }
    } else {
        return null
    }
}

module.exports = router