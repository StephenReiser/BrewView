const express = require('express')
const sessions = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


sessions.get('/new', (request, response) => {
    response.render('sessions/new.ejs')
})

sessions.post('/', (request, response)=>{
  User.findOne({ username: request.body.username },(error, foundUser) =>{
    if (bcrypt.compareSync(request.body.password, foundUser.password)) {
        request.session.currentUser = foundUser
        
        response.redirect('/brew')
    } else {
        response.send(('<a href="/brew">wrong password</a>'))
    }
  })
})

sessions.delete('/', (request, response) => {
    request.session.destroy(()=>{
        response.redirect('/brew')
    })
})


module.exports = sessions