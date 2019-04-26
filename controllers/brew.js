const express = require('express')
const brew = express.Router()
///ultimately wil need to require any necessary Model and bcrypt
const Brew = require('../models/brew')



////index route

brew.get('/', (request, response) => {
    Brew.find({},(error, foundBrew) => {
        response.render('index.ejs', {
            brews: foundBrew
        })

    })
})



///////////////////////Seed route///////////Need to get create route up
const seed = require('../models/seed')
brew.get('/seedBrews', (request, response) => {
    // encrypts the given seed passwords

    // seeds the data
    Brew.create(seed, (err, createdBrews) => {
      // logs created users
      console.log(createdBrews);
      // redirects to index
      res.redirect('/');
    });
  });
  

///featured route (sort of a show page)
brew.get('/featured', (request, response) => {
    
    response.render('brew/landing.ejs')
})

////////////New Route (visible)
brew.get('/new', (request, response) => {
    response.render('brew/new.ejs')
}
)


////create route///////////////

brew.post('/', (request, response) => {
    //woudl need to do model.create here
    if (request.body.dogFriendly === 'on') {
        request.body.dogFriendly = true
    } else {
        request.body.dogFriendly = false
    }
    if (request.body.outsideFood === 'on') {
        request.body.outsideFood = true
    } else {
        request.body.outsideFood = false
    }
    if (request.body.foodTrucks === 'on') {
        request.body.foodTrucks = true
    } else {
        request.body.foodTrucks = false
    }
    if (request.body.glutenFree === 'on') {
        request.body.glutenFree = true
    } else {
        request.body.glutenFree = false
    }
    Brew.create(request.body, (error, createdBrew) => {
        if(error) {
            console.log(error)
        } console.log(createdBrew)
        response.redirect('/brew')
    })
})


////////////////Delete Route//////////////////////////
brew.delete('/:id', (request, response) => {
    response.send('clicked')
    ////need to do something like findByIdAndRemove
})


////////////////////////////Edit Route//////////////////
brew.get('/:id/edit', (request, response) => {
    response.render('brew/edit.ejs')
    /////really should have this findByID and then render a form
})


///////////////////////Update Route///////////////////////

brew.put('/:id', (request, response) => {
    /////should do a findByIdAndUpdate
    ////
    response.send('something')
})


/////show route
brew.get('/:id', (request, response) => {
    response.render('brew/show.ejs')
   
})



module.exports = brew