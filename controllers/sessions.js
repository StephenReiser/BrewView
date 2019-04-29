const express = require('express')
const sessions = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


sessions.get('/new', (request, response) => {
    response.render('sessions/new.ejs', {
        currentUser: request.session.currentUser
    })
})

sessions.post('/', (request, response)=>{
  User.findOne({ username: request.body.username },(error, foundUser) =>{
    if (bcrypt.compareSync(request.body.password, foundUser.password)) {
        request.session.currentUser = foundUser.username
        
        response.redirect('/map')
    } else {
        response.send(('<a href="/map">wrong password</a>'))
    }
  })
})

sessions.delete('/', (request, response) => {
    request.session.destroy(()=>{
        response.redirect('/map')
    })
})


module.exports = sessions