const express = require('express')
const brew = express.Router()
///ultimately wil need to require any necessary Model and bcrypt



////index route

brew.get('/', (request, response) => {
    response.send('INDEX ROUTE')
    // response.render('brew/landing.ejs')
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


////create - this is set up, but won't do anything until forms are set up

brew.post('/', (request, response) => {
    //woudl need to do model.create here
    response.redirect('/')
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