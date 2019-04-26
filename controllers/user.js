const express = require('express')
const users = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

users.get('/new', (request, response) => {
    response.render('user/new.ejs')
    
})

users.post('/', (request, response) => {
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
    User.create(request.body, (error, createdUser)=> {
        if(error) {
            response.send(error)
        } console.log(createdUser)
            response.redirect('/brew')
    })
})
module.exports = users