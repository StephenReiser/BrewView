const express = require('express')
const users = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

users.get('/error', (request, response) => {
    response.render('user/newerror.ejs', {
        currentUser: request.session.currentUser
    })
    // response.send('Error')

    //not sure why this doesn't work, but feels liek it should
    
})
users.get('/new', (request, response) => {
    response.render('user/new.ejs', {
        currentUser: request.session.currentUser
    })
    
})

////////This is giving an error and causing nodemon to crash if there is a duplicate user

users.post('/', (request, response) => {
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
    User.create(request.body, (error, createdUser)=> {
        // console.log(createdUser)
        if(error) {
            // response.redirect('/users/new/error', {
            //     // this is erroring out because it isn't getting an error - createduser is returning something weird
            // })
            console.log(error)
            response.redirect('/users/error')
        } 
    else {
        request.session.currentUser = createdUser.username
            response.redirect('/map')
    }})
})
module.exports = users