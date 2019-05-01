const express = require('express')
const sessions = express.Router()
require('dotenv').config()
const Brew = require('../models/brew')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const superUser = process.env.SUPERUSER


sessions.get('/new', (request, response) => {
    Brew.find({}, (error, foundBrews) => {
    response.render('sessions/new.ejs', {
        brews: foundBrews,
        currentUser: request.session.currentUser,
        superUser: superUser
    })
})
})

sessions.get('/error', (request, response) => {
    Brew.find({}, (error, foundBrews) => {
    response.render('sessions/error.ejs', {
        brews: foundBrews,
        currentUser: request.session.currentUser,
        superUser: superUser
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
        /////would some how have to pass previous page into this
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