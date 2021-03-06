const express = require('express')
const users = express.Router()
require('dotenv').config()
const User = require('../models/user')
const Brew = require('../models/brew')
const bcrypt = require('bcrypt')
const superUser = process.env.SUPERUSER

users.get('/error/:name', (request, response) => {
    // let errorUser = request
    // console.log(request.params.name)
    Brew.find({}, (error, foundBrews) => {
    response.render('user/newerror.ejs', {
        brews: foundBrews,
        currentUser: request.session.currentUser,
        superUser: superUser,
        errorUser: request.params.name
    })
    // response.send('Error')

    //not sure why this doesn't work, but feels liek it should
    
})
})
users.get('/new', (request, response) => {
    Brew.find({}, (error, foundBrews) => {
    response.render('user/new.ejs', {
        brews: foundBrews,
        currentUser: request.session.currentUser,
        superUser: superUser
    })
    
})
})


users.post('/', (request, response) => {
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
    User.create(request.body, (error, createdUser)=> {
        // console.log(createdUser)
        // console.log(request.body.username)
        if(error) {
            // response.redirect('/users/new/error', {
            //     // this is erroring out because it isn't getting an error - createduser is returning something weird
            // })
            // console.log(error)
            // console.log(request.body.username)
            response.redirect('/users/error/'+request.body.username)
        } 
    else {
        request.session.currentUser = createdUser.username
        /////would some how have to pass previous page into this
            response.redirect('/map')
    }})
})
module.exports = users