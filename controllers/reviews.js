// DEPENDENCIES
const express = require('express');
const reviews = express.Router();
const User = require('../models/user.js');
const Brew = require('../models/brew')

// const isAuthenticated = (request, response, next) => {
//   if(request.session.currentUser) {
      
//       return next()
//       //next() is a function that passes control to the next middleware function.  this does not end the request-response cycle, sort of passes it off to the next piece of the cycle
//   } else {
//       response.redirect('/')
//   }
// }

///Above doesn't do anything - should add it to the other controllers though!

/////////ROUTES


reviews.post ('/:id/new', (request, response) => {
  // finds user by id (based on current logged in user )
    // console.log(request)
    console.log(request.session.currentUser.username)
    console.log(request.params.id)
    console.log(request.body.review)
    let review = {
        username: request.session.currentUser,
        userComments: request.body.review
    }
    console.log(review)
  Brew.findOneAndUpdate(
    {_id: request.params.id},
    // uses $push method to push the req.body.message
    { $push: {
         comments: review } },
   
    (error, reviewed) => {
        if(error) {
            console.log(error)
        } console.log(reviewed)
      
      response.redirect('/brew/'+request.params.id);
  });
});

// EXPORT
module.exports = reviews;
