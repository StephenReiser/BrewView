const express = require('express')
const sessions = require('express-session')
const brew = express.Router()
const request = require('request')
///ultimately wil need to require any necessary Model and bcrypt
const Brew = require('../models/brew')
let bodyArray = []



////////request function - probably need to move out of here
const requestFunc = (url) => {
    request(url,(error, response, body) => {
        
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        bodyArray = JSON.parse(body)
        
        
    
    })
    }

    requestFunc('https://api.openbrewerydb.org/breweries?by_state=connecticut&page=1&per_page=5')

    /////I think I should put this in each of the seed routes
    


















////index route

brew.get('/', (request, response) => {
    
    Brew.find({},(error, foundBrew) => {
        response.render('index.ejs', {
            brews: foundBrew,
            currentUser: request.session.currentUser
            
            
        })
        
        
    })
})


///////// Seed Route

brew.get('/seedrouteone', (request, response) => {

    for (i = 0; i < bodyArray.length; i++) {
        console.log('-----------------')
        Brew.create({
            name: bodyArray[i].name,
            address: bodyArray[i].street || '',
            city: bodyArray[i].city || '',
            state: bodyArray[i].state || '',
            zip: bodyArray[i].postal_code || '',
            phone: bodyArray[i].phone || '',
            email: '',
            latitude: Number(bodyArray[i].latitude) || 0,
            longitude: Number(bodyArray[i].longitude) || 0,
            website: bodyArray[i].website_url || 'www.google.com',
            mainImage: '',
            imageTwo: '',
            imageThree: '',
            imageFour: '',
            dogFriendly: 'Not Yet Verified',
            outsideFood: 'Not Yet Verified',
            foodTrucks: 'Not Yet Verified',
            glutenFree: 'Not Yet Verified',



        }, (error, newBrew) => {
            if(error) {
                console.log(bodyArray[i])
            }
        })
        
        // response.send('Added seed data of' + bodyArray[i].name)

      
    }

    response.redirect('/brew')
    // response.send(bodyArray)
    // response.send('testpage')
})



  

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

    Brew.create(request.body, (error, createdBrew) => {
        if(error) {
            console.log(error)
        } console.log(createdBrew)
        response.redirect('/brew')
    })
})


////////////////Delete Route//////////////////////////
brew.delete('/:id', (request, response) => {
    // response.send('clicked')
    ////need to do something like findByIdAndRemove
    Brew.findByIdAndRemove(request.params.id, (error, removed) => {
        if(error) {
            console.log(error)
        } response.redirect('/brew')
    })
})


////////////////////////////Edit Route//////////////////
brew.get('/:id/edit', (request, response) => {
    Brew.findById(request.params.id, (error, currentBrew) => {
        response.render('brew/edit.ejs', {
            brew: currentBrew
        })

    })
    /////really should have this findByID and then render a form
})


///////////////////////Update Route///////////////////////

brew.put('/:id', (request, response) => {
    /////should do a findByIdAndUpdate
    ////
    Brew.findByIdAndUpdate(request.params.id, {
        $set: request.body
    }, {new: true}, (error, newBrew) => {
        if(error) {
            console.log(error)
        } response.redirect('/brew')
    } )
})


/////show route
brew.get('/:id', (request, response) => {
    Brew.findById(request.params.id, (error, currentBrew) => {
        response.render('brew/show.ejs', {
            brew: currentBrew,
            currentUser: request.session.currentUser
        })
        // console.log(request.session.currentUser)
    })
   
})



module.exports = brew