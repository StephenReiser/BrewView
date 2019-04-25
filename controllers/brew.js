const express = require('express')
const brew = express.Router()
///ultimately wil need to require any necessary Model and bcrypt


brew.get('/', (request, response) => {
    response.send('BrewView Landing Page')
})



module.exports = brew