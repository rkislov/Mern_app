const mongoose = require('mongoose')
const passport = require('passport')
const settings = require('../config/settings')
require('../config/passport')(passport)
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')


router.post('/register', (req, res) =>{
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Пожалуйста заполниет регистрационные данные'})
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        newUser.save( err => {
            if(err) {
                return res.json({success: false, msg: 'Такой пользователь уже существует в системе'})
            }

            res.json({success: true, msg: 'Пользователь создан'})
        })
    }
})

router.post('/login', (req,res)=>{
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if(err) throw err

        if(!user) {
            res.status(401).send({success: false, msg: 'Аутентификация не пройдена. Пользователь не найден'})
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    const token = jwt.sign(user.toJSON(), settings.secret)
                    res.json({success: true, token: 'JWT ' + token})
                } else {
                    res.status(401).send({success: false, msg: 'Аутентификация не пройдена. Не верный пароль'})
                }
            })
        }
    })
})

module.exports = router