const express = require('express')
const sessions = express.Router()
const Brew = require('../models/brew')
const User = require('../models/user')
const bcrypt = require('bcrypt')


sessions.get('/new', (request, response) => {
    Brew.find({}, (error, foundBrews) => {
    response.render('sessions/new.ejs', {
        brews: foundBrews,
        currentUser: request.session.currentUser
    })
})
})

sessions.get('/error', (request, response) => {
    Brew.find({}, (error, foundBrews) => {
    response.render('sessions/error.ejs', {
        brews: foundBrews,
        currentUser: request.session.currentUser
    })
})
})

sessions.post('/', (request, response)=>{
  User.findOne({ username: request.body.username },(error, foundUser) =>{
      if(foundUser === null) {
          response.redirect('/sessions/error')
      } else {
    if (bcrypt.compareSync(request.body.password, foundUser.password)) {
        request.session.currentUser = foundUser.username
        
        response.redirect('/map')
    } else {
        response.redirect('/sessions/error')
    }
  }})
})

sessions.delete('/', (request, response) => {
    request.session.destroy(()=>{
        response.redirect('/map')
    })
})


module.exports = sessions