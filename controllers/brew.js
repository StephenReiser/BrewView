const express = require('express')
const sessions = require('express-session')
const brew = express.Router()
const request = require('request')
///ultimately wil need to require any necessary Model and bcrypt
const Brew = require('../models/brew')
let bodyArray = []
let secondBodyArray = []
let testBrewName = {}

const isAuthenticated = (request, response, next) => {
  if(request.session.currentUser) {
      
      return next()
      //next() is a function that passes control to the next middleware function.  this does not end the request-response cycle, sort of passes it off to the next piece of the cycle
  } else {
      response.redirect('/')
  }
}

////////request function - probably need to move out of here
const requestFunc = (url) => {
    request(url,(error, response, body) => {
        
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        bodyArray = JSON.parse(body)
        
        
    
    })
    }

    // requestFunc('https://api.openbrewerydb.org/breweries?by_state=connecticut&page=1&per_page=50')

    /////I think I should put this in each of the seed routes
    const secondRequestFunc = (url) => {
        request(url,(error, response, body) => {
            
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            secondBodyArray = JSON.parse(body)
            
            
        
        })
        }
    
        // requestFunc('https://api.openbrewerydb.org/breweries?by_state=connecticut&page=1&per_page=50')
        // secondRequestFunc('https://api.openbrewerydb.org/breweries?by_state=connecticut&page=2&per_page=50')
    


















////index route

brew.get('/', (request, response) => {
    
    Brew.find({},(error, foundBrew) => {
        response.render('oldindex.ejs', {
            brews: foundBrew,
            currentUser: request.session.currentUser
            
            
        })
        
        
    })
})


///////// Seed Route

brew.get('/seedrouteone', (request, response) => {
    console.log(bodyArray)
    console.log(bodyArray.length)
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

    response.redirect('/map')
    // response.send(bodyArray)
    // response.send('testpage')
})


///////second seed route

brew.get('/seedroutetwo', (request, response) => {
    // console.log(secondBodyArray)
    // console.log(secondBodyArray.length)
    for (i = 0; i < secondBodyArray.length; i++) {
        console.log('-----------------')
        Brew.create({
            name: secondBodyArray[i].name,
            address: secondBodyArray[i].street || '',
            city: secondBodyArray[i].city || '',
            state: secondBodyArray[i].state || '',
            zip: secondBodyArray[i].postal_code || '',
            phone: secondBodyArray[i].phone || '',
            email: '',
            latitude: Number(secondBodyArray[i].latitude) || 0,
            longitude: Number(secondBodyArray[i].longitude) || 0,
            website: secondBodyArray[i].website_url || 'www.google.com',
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
                console.log(secondBodyArray[i])
            }
        })
        
        // response.send('Added seed data of' + secondBodyArray[i].name)

      
    }

    response.redirect('/map')
    // response.send(secondBodyArray)
    // response.send('testpage')
})



  

///featured route (sort of a show page) - I removed this
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
        response.redirect('/map')
    })
})


////////////////Delete Route//////////////////////////
brew.delete('/:id', isAuthenticated, (request, response) => {
    // response.send('clicked')
    ////need to do something like findByIdAndRemove
    Brew.findByIdAndRemove(request.params.id, (error, removed) => {
        if(error) {
            console.log(error)
        } response.redirect('/brew')
    })
})


////////////////////////////Edit Route//////////////////
brew.get('/:id/edit', isAuthenticated, (request, response) => {
    Brew.findById(request.params.id, (error, currentBrew) => {
        response.render('brew/edit.ejs', {
            brew: currentBrew,
            currentUser: request.session.currentUser
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
        } response.redirect('/map')
    } )
})


/////show route
brew.get('/:id', (request, response) => {
    // Brew.find({}, (error, foundBrew) => {
    //     return foundBrew
    // })
    
    Brew.findById(request.params.id, (error, currentBrew) => { 
        
        response.render('brew/show.ejs', {
            brew: currentBrew,
            currentUser: request.session.currentUser,
            brews: 0
        })
        
    })

/////maybe it makes sense to pass in the full array and then declare brew in the ejs file
    /////This seems close - but not working - it is finding something but doesn't seem to convert it?

    // console.log(Brew.findById(request.params.id))

    // Brew.find({}, (error, foundBrews) => {
        
    //     response.render('brew/show.ejs', {
    //         brew: Brew.findById(request.params.id),
    //         currentUser: request.session.currentUser,
    //         brews: foundBrews
    //     })

    // })


   
})



module.exports = brew